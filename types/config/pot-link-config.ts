// Types
import { IPotLinkProps } from "../props/pot-link-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";

type TPotInputColorVarsList = (
    'text' |
    'underline' |
    'underlineText' |
    'hoverText' |
    'hoverUnderline' |
    'hoverUnderlineText' |
    'activeText' |
    'activeUnderline' |
    'activeUnderlineText'
);

type TPotInputSizeVarsList = (
    'text' |
    'underline' |
    'icon'
);

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
> = (
    IPotComponentConfig<IPotLinkProps<TDevice, TColor, TSize>> & 
    IPotComponentSizeConfig<TSize, TPotInputSizeVarsList> &
    IPotComponentColorConfig<TPotInputColorVarsList>
)

/** PotInput */
export interface IPotLinkConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
> extends TConfig<TDevice, TColor, TSize> {} 