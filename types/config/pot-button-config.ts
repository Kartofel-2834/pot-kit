// Types
import { IPotButtonProps } from "../props/pot-button-props";
import { IPotKitComponentConfig } from "./pot-component-config";

/** PotButton */
export interface IPotButtonConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends IPotKitComponentConfig<IPotButtonProps<TDevice, TColor, TSize, TRadius>> {
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