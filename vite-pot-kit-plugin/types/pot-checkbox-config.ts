// Types
import { IPotKitComponentConfig } from "./pot-component-config";

/* PotCheckbox */
export interface IPotCheckboxConfig<TSize extends string> extends IPotKitComponentConfig<TSize> {
    color: {
        text: string;
        background: string;
        icon: string;
        border: string;
        
        hoverText: string;
        hoverBorder: string;
        hoverBackground: string;
        hoverIcon: string;

        checkedText: string;
        checkedBorder: string;
        checkedBackground: string;
        checkedIcon: string;

        checkedHoverText: string;
        checkedHoverBorder: string;
        checkedHoverBackground: string;
        checkedHoverIcon: string;

        disabledText: string;
        disabledBorder: string;
        disabledBackground: string;
        disabledCheckedBackground: string;
        disabledIcon: string;
    };

    size: {
        [key in TSize]: {
            text: string | number;
            height: string | number;
            icon: string | number;
            border: string | number;
            gap: string | number;
        } 
    }
}