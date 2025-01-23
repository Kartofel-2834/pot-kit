export type TRequestPrimitiveValue = string | number | boolean | null;

export type TRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TRequestInterceptor = (
    options: RequestInit,
    resource: URL,
    abortId: symbol
) => RequestInit | symbol | void; 

export type TResponseInterceptor = (response: Response) => void; 

export type TRequestContext = {
    method?: TRequestMethods;
};

export type TRequestParams = Record<string, TRequestPrimitiveValue | TRequestPrimitiveValue[]>;

export type TRequestInitOptions = {
    options?: RequestInit;
    baseUrl?: string;
    bodyFormatter?: ((v: unknown) => BodyInit) | null;
};

export type RequestOptions = TRequestInitOptions & {
    body?: unknown;
    params?: TRequestParams;
};

export type TRequestSender = (
    endpoint: string,
    requestOptions?: RequestOptions,
) => Promise<Response>;

export type TRequestBindedSenders = {
    [K in Lowercase<TRequestMethods>]: TRequestSender;
};

export type TRequestHelper = TRequestBindedSenders & {
    send: TRequestSender;
    addRequestInterceptor: (interceptor: TRequestInterceptor) => symbol;
    addResponseInterceptor: (interceptor: TResponseInterceptor) => symbol;
    removeInterceptor: (type: 'request' | 'response', interceptorId: symbol) => boolean;
};
