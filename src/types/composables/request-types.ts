export type RequestPrimitiveValue = string | number | boolean | null;

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestInterceptor = (
    options: RequestInit,
    resource: URL,
    abortId: symbol
) => RequestInit | symbol | void; 

export type ResponseInterceptor = (response: Response) => void; 

export type RequestContext = {
    method?: RequestMethods;
};

export type RequestParams = Record<string, RequestPrimitiveValue | RequestPrimitiveValue[]>;

export type RequestInitOptions = {
    options?: RequestInit;
    baseUrl?: string;
    bodyFormatter?: ((v: unknown) => BodyInit) | null;
};

export type RequestOptions = RequestInitOptions & {
    body?: unknown;
    params?: RequestParams;
};

export type RequestSender = (
    endpoint: string,
    requestOptions?: RequestOptions,
) => Promise<Response>;

export type RequestBindedSenders = {
    [K in Lowercase<RequestMethods>]: RequestSender;
};

export type RequestHelper = RequestBindedSenders & {
    send: RequestSender;
    addRequestInterceptor: (interceptor: RequestInterceptor) => symbol;
    addResponseInterceptor: (interceptor: ResponseInterceptor) => symbol;
    removeInterceptor: (type: 'request' | 'response', interceptorId: symbol) => boolean;
};
