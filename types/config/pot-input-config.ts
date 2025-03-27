// Types
import { IPotKitComponentConfig } from "./pot-component-config";

interface IPotInputBaseProps<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
    T = string
> {
    value?: T;
    modelValue?: T;
    formatter?: (value: T) => string;
    parser?: (value: string) => T;
    devices?: TDevice[];
    radius?: TRadius | TRadius[] | null;
    size?: TSize | TSize[] | null;
    color?: TColor | TColor[] | null;
    icon?: string;
    preicon?: string;
    disabled?: boolean;
    invalid?: boolean;
}

/** PotInput */
export interface IPotInputConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends IPotKitComponentConfig<IPotInputBaseProps<TDevice, TColor, TSize, TRadius>, TSize> {
    color: {
        border: string;
        background: string;
        text: string;
        icon: string;

        hoverBorder: string;
        hoverBackground: string;
        hoverText: string;
        hoverIcon: string;

        focusedBorder: string;
        focusedBackground: string;
        focusedText: string;
        focusedIcon: string;

        disabledBorder: string;
        disabledBackground: string;
        disabledText: string;
        disabledIcon: string;
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