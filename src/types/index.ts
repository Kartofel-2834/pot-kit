export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type ObjectValues<T> = T[keyof T]; 

export type TVueNativeType = null | number | string | boolean | symbol | Function; 

export type TVueInferDefault<P, T> = ((props: P) => T & {}) | (T extends TVueNativeType ? T : never);

export type TVueInferDefaults<T> = {
    [K in keyof T]?: TVueInferDefault<T, T[K]>;
};

export type TVueLooseRequired<T> = {
    [P in keyof (T & Required<T>)]: T[P];
};

export type TPropsDefaults<TProps> = TVueInferDefaults<TVueLooseRequired<TProps>>;