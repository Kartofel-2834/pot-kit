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

export interface IPotKitConfig<TSize extends string = string> {
    breakpoints: Record<string, number>;

    size: TSize[];

    color: {
        [colorName: string]: {
            [varName: string]: string;
        } 
    };

    radius: {
        [radiusName: string]: string | number;
    };

    gap: {
        [gapName: string]: string | number;
    };

    components: {
        button: IPotButtonConfig<TSize>
    }
}



/** PotButton */
export interface IPotButtonConfig<TSize extends string> extends IPotKitComponentConfig<TSize> {
    color: {
        border: string;
        background: string;
        text: string;

        hoverBorder: string;
        hoverBackground: string;
        hoverText: string;

        activeBorder: string;
        activeBackground: string;
        activeText: string;

        disabledBorder: string;
        disabledBackground: string;
        disabledText: string;
    };

    size: {
        [key in TSize]: {
            height: string | number;
            text: string | number;
            padding: string | number;
            gap: string | number;
            border: string | number;
            icon: string | number;
        } 
    }
}