// Types
import type {
    RequestHelper,
    RequestContext,
    RequestInitOptions,
    RequestOptions,
    RequestInterceptor,
    ResponseInterceptor,
    RequestParams
} from '@/types/composables';

/**
 * Компосабл-обертка над браузерным fetch
 * 
 * @param initRequestOptions - настройки для отправляемых запросов
 * @param initRequestOptions.options - options браузерного fetch
 * @param initRequestOptions.baseUrl - базовый URL
 * @param initRequestOptions.bodyFormatter - функция для обработки тела запроса перед отправкой
 * 
 * @returns - возвращает набор методов для отправки fetch запросов и методы для добавления интерцепторов
*/
export function useRequest(initRequestOptions: RequestInitOptions = {}): RequestHelper {
    const requestInterceptors: Map<symbol, RequestInterceptor> = new Map();
    const responseInterceptors: Map<symbol, ResponseInterceptor> = new Map();

    const defaultRequestOptions: RequestOptions = {
        baseUrl: window?.location?.href || '/',
        bodyFormatter: JSON.stringify,
        ...initRequestOptions,
    };

    /**
     * Надстройка над браузерным fetch
     * 
     * @context method - в контекст функции можно вшить HTTP метод используемый для
     *                   отправки запросов по-умолчанию
     * 
     * @param url - ссылка на ресурс как string (без baseUrl) 
     *  
     * @param requestOptions - настройки запроса
     * @param requestOptions.body - тело запроса
     * @param requestOptions.params - query-параметры запроса
     * @param requestOptions.options - настройки браузерного fetch
     * @param requestOptions.baseUrl - базовый URL
     * @param requestOptions.bodyFormatter - функция для обработки тела запроса перед отправкой
     * 
     * @returns - результат отправки браузерного fetch запроса
    */
    async function request(
        this: RequestContext,
        url: string,
        requestOptions: RequestOptions = {},
    ): Promise<Response> {
        const method: string = this.method || 'GET';
        const { params, baseUrl, options, body, bodyFormatter } = { 
            ...defaultRequestOptions,
            ...requestOptions
        };

        const requestUrl = createUrl(url, params, baseUrl);
        const fetchOptions: RequestInit = {
            method,
            ...(options || {}),
        };

        if (body && bodyFormatter instanceof Function) {
            fetchOptions.body = bodyFormatter(body);
        }

        return customFetch(requestUrl, fetchOptions);
    }

    /** Фетч с интерцепторами */
    async function customFetch(resource: URL, options: RequestInit): Promise<Response> {
        const abortId = createId();
        let updatedRequestOptions: RequestInit = { ...options };

        for (const interceptor of requestInterceptors.values()) {
            const result = interceptor(updatedRequestOptions, resource, abortId);

            // Если из интерцептора вернули abortId, то запрос оборвется и не будет отправлен
            if (abortId === result) {
                return getAbortPromise(); 
            } else if (typeof result !== 'symbol' && result) {
                updatedRequestOptions = result;
            }
        }

        return fetch(resource, updatedRequestOptions).then(response => {
            for (const interceptor of responseInterceptors.values()) {
                interceptor(response);
            }

            return response;
        });
    }

    function createUrl(
        url: string,
        params?: RequestParams,
        base?: string,
    ): URL {
        const createdUrl = new URL(url, base);

        if (!params) {
            return createdUrl;
        }

        Object.entries(params).forEach(([key, value]) => {
            if (!Array.isArray(value)) {
                return createdUrl.searchParams.append(key, `${value}`);
            }
            
            value.forEach(item => createdUrl.searchParams.append(key, `${item}`));
        });

        return createdUrl;
    }

    function addRequestInterceptor(interceptor: RequestInterceptor): symbol {
        const id = createId();
        requestInterceptors.set(id, interceptor);
        return id;
    }
    
    function addResponseInterceptor(interceptor: ResponseInterceptor): symbol {
        const id = createId();
        responseInterceptors.set(id, interceptor);
        return id;
    }

    function removeInterceptor(
        type: 'request' | 'response', 
        interceptorId: symbol
    ): boolean {
        const target = type === 'request' ? requestInterceptors : responseInterceptors;

        return target.delete(interceptorId);
    }

    function getAbortPromise(): Promise<Response> {
        return new Promise<Response>((res, rej) => rej(new Error('request aborted')));
    }

    function createId(): symbol {
        return Symbol(`${Date.now()}_${Math.ceil(Math.random() * 10000)}`);
    }

    return {
        send: request,
        addRequestInterceptor,
        addResponseInterceptor,
        removeInterceptor,
        get: request.bind({ method: 'GET' }),
        post: request.bind({ method: 'POST' }),
        put: request.bind({ method: 'PUT' }),
        patch: request.bind({ method: 'PATCH' }),
        delete: request.bind({ method: 'DELETE' }),
    };
}