export interface IPotComponentConfig<TProps extends object = object> {
    defaults?: Partial<TProps>;
}

export interface IPotComponentSizeConfig<
    TSize extends string = string,
    TComponentSizeVarsList extends string = string,
> {
    size?: {
        [key in TSize]: {
            [varName in TComponentSizeVarsList]: string | number;
        } 
    }
}

export interface IPotComponentColorConfig<
    TStateVars extends object = object,
    TStatesList extends string = string, 
> {
    color?: {
        [state in TStatesList]?: TStateVars;
    };
}