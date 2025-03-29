// Types
import { IPotInputBaseProps } from "../props/pot-input-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";

type TPotInputColorVarsList = (
    'border' |
    'background' |
    'text' |
    'icon' |
    'hoverBorder' |
    'hoverBackground' |
    'hoverText' |
    'hoverIcon' |
    'focusedBorder' |
    'focusedBackground' |
    'focusedText' |
    'focusedIcon' |
    'disabledBorder' |
    'disabledBackground' |
    'disabledText' |
    'disabledIcon'
);

type TPotInputSizeVarsList = (
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
    IPotComponentConfig<IPotInputBaseProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize, TPotInputSizeVarsList> &
    IPotComponentColorConfig<TPotInputColorVarsList>
)

/** PotInput */
export interface IPotInputConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {} 