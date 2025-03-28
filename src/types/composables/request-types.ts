export type TRequestPrimitiveValue = string | number | boolean | null;

export type TRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TRequestInterceptor = (
    options: RequestInit,
    resource: URL,
    abortId: symbol
) => RequestInit | symbol | void; 

export type TResponseInterceptor = (response: Response) => void; 

export type TRequestParams = Record<string, TRequestPrimitiveValue | TRequestPrimitiveValue[]>;

export type TRequestInitOptions = {
    options?: RequestInit;
    baseUrl?: string;
    bodyFormatter?: ((v: unknown) => BodyInit) | null;
};

export type TRequestOptions = TRequestInitOptions & {
    body?: unknown;
    params?: TRequestParams;
};

export type TRequestSender = ( 
    method: TRequestMethods,
    endpoint: string,
    requestOptions?: TRequestOptions,
) => Promise<Response>;

export type TRequestBindedSender = ( 
    endpoint: string,
    requestOptions?: TRequestOptions,
) => Promise<Response>;

export type TRequestBindedSenders = {
    [K in Lowercase<TRequestMethods>]: TRequestBindedSender;
};

export type TRequest = TRequestBindedSenders & {
    send: TRequestSender;
    addRequestInterceptor: (interceptor: TRequestInterceptor) => symbol;
    addResponseInterceptor: (interceptor: TResponseInterceptor) => symbol;
    removeInterceptor: (type: 'request' | 'response', interceptorId: symbol) => boolean;
    getUrl: (url: string, params?: TRequestParams, base?: string) => URL;
};