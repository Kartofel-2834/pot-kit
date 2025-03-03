// Types
import { IPotKitComponentConfig } from "./pot-component-config";

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