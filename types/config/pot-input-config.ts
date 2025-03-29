// Types
import { IPotInputBaseProps } from "../props/pot-input-props";
import { IPotKitComponentConfig } from "./pot-component-config";

/** PotInput */
export interface IPotInputConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends IPotKitComponentConfig<IPotInputBaseProps<TDevice, TColor, TSize, TRadius>> {
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