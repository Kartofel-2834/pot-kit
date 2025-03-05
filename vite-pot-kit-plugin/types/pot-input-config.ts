// Types
import { IPotKitComponentConfig } from "./pot-component-config";

/** PotInput */
export interface IPotInputConfig<TSize extends string> extends IPotKitComponentConfig<TSize> {
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