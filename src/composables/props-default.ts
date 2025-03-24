type NativeType = null | number | string | boolean | symbol | Function;

type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);

type InferDefaults<T> = {
    [K in keyof T]?: InferDefault<T, T[K]>;
};

export function usePropsDefault<T>(defaults: Partial<T>, config: Partial<T> = {}): InferDefaults<T> {
    return Object.entries({
        ...defaults,
        ...config
    }).reduce((res, [key, value]) => {
        return {
            ...res,
            [key]: mapValueToDefault(value)
        };
    }, {});
}

function mapValueToDefault(value: unknown): NativeType {
    return typeof value === 'object' && value !== null ? (() => value) : value as NativeType;
}
