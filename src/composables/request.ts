// Types
import type {
    TRequest,
    TRequestInitOptions,
    TRequestOptions,
    TRequestInterceptor,
    TResponseInterceptor,
    TRequestParams,
    TRequestMethods
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
export function useRequest(initRequestOptions: TRequestInitOptions = {}): TRequest {
    const requestInterceptors: Map<symbol, TRequestInterceptor> = new Map();
    const responseInterceptors: Map<symbol, TResponseInterceptor> = new Map();

    const defaultRequestOptions: TRequestOptions = {
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
        method: TRequestMethods,
        url: string,
        requestOptions: TRequestOptions = {},
    ): Promise<Response> {
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

    function getUrl(url: string, params?: TRequestParams, base?: string): URL {
        const currentBase = base || defaultRequestOptions.baseUrl;
        return createUrl(url, params, currentBase);
    }

    function createUrl(
        url: string,
        params?: TRequestParams,
        base?: string,
    ): URL {
        let createdUrl: URL;

        if (base) {
            const baseUrl = new URL(base);
            const pathname = [baseUrl.pathname, url].filter(Boolean).join('/').replace(/\/+/gm, '/');

            createdUrl = new URL(pathname, base);
        } else {
            createdUrl = new URL(url);
        }

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

    function addRequestInterceptor(interceptor: TRequestInterceptor): symbol {
        const id = createId();
        requestInterceptors.set(id, interceptor);
        return id;
    }
    
    function addResponseInterceptor(interceptor: TResponseInterceptor): symbol {
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
        getUrl,
        get: (...args) => request('GET', ...args),
        post: (...args) => request('POST', ...args),  
        put: (...args) => request('PUT', ...args),
        patch: (...args) => request('PATCH', ...args), 
        delete: (...args) => request('DELETE', ...args),
    };
}