// Types
import {
    IPotComponentColorConfig,
    IPotComponentConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";
import { IPotCheckboxProps } from "../props/pot-checkbox-props";

type TPotCheckboxColorVarsList = (
    'text' |
    'background' |
    'icon' |
    'border' |
    'hoverText' |
    'hoverBorder' |
    'hoverBackground' |
    'hoverIcon' |
    'checkedText' |
    'checkedBorder' |
    'checkedBackground' |
    'checkedIcon' |
    'checkedHoverText' |
    'checkedHoverBorder' |
    'checkedHoverBackground' |
    'checkedHoverIcon' |
    'disabledText' |
    'disabledBorder' |
    'disabledBackground' |
    'disabledCheckedBackground' |
    'disabledIcon'
);

type TPotCheckboxSizeVarsList = (
    'text' |
    'height' |
    'icon' |
    'border' |
    'gap'
);

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotCheckboxProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize, TPotCheckboxSizeVarsList> &
    IPotComponentColorConfig<TPotCheckboxColorVarsList>
);

/* PotCheckbox */
export interface IPotCheckboxConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {}