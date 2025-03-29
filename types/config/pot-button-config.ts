// Types
import { IPotButtonProps } from "../props/pot-button-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from "./pot-component-config";

type TPotButtonColorVarsList = (
    'border' |
    'background' |
    'text' |
    'hoverBorder' |
    'hoverBackground' |
    'hoverText' |
    'activeBorder' |
    'activeBackground' |
    'activeText' |
    'disabledBorder' |
    'disabledBackground' |
    'disabledText'
);

type TPotButtonSizeVarsList = (
    'height' |
    'text' |
    'padding' |
    'gap' |
    'border' |
    'icon'
);

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotButtonProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize, TPotButtonSizeVarsList> &
    IPotComponentColorConfig<TPotButtonColorVarsList>
);

/** PotButton */
export interface IPotButtonConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {}