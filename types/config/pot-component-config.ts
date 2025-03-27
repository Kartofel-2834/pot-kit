
type VueNativeType = null | number | string | boolean | symbol | Function;

type VueInferDefault<P, T> = ((props: P) => T & {}) | (T extends VueNativeType ? T : never);

type VueInferDefaults<T> = {
    [K in keyof T]?: VueInferDefault<T, T[K]>;
};

export interface IPotKitComponentConfig<
    TProps extends object = object,
    TSize extends string = string
> {
    defaults?: VueInferDefaults<TProps>;
    
    color: {
        [varName: string]: string;
    };

    size?: {
        [key in TSize]: {
            [varName: string]: string | number;
        };
    };
}