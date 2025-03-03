export interface IPotKitComponentConfig<TSize extends string = string> {
    color: {
        [varName: string]: string;
    };

    size?: {
        [key in TSize]: {
            [varName: string]: string | number;
        };
    };
}