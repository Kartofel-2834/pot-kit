// Types
import { IPotRadioProps } from "../props/pot-radio-props";
import {
    IPotComponentColorConfig,
    IPotComponentConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";

type TPotRadioColorVarsList = (
    'text' |
    'marker' |
    'markerBorder' |
    'markerBackground' |
    'markerPoint' |
    'hoverText' |
    'hoverMarker' |
    'hoverMarkerBorder' |
    'hoverMarkerBackground' |
    'hoverMarkerPoint' |    
    'activeText' |
    'activeMarker' |
    'activeMarkerBorder' |
    'activeMarkerBackground' | 
    'activeMarkerPoint' |
    'disabledText' |
    'disabledMarker' |
    'disabledMarkerBorder' |
    'disabledMarkerBackground' |
    'disabledMarkerPoint'
);

type TPotRadioSizeVarsList = (
    'text' |
    'gap' |
    'marker' |
    'markerBorder' |
    'markerPoint'
);

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotRadioProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize, TPotRadioSizeVarsList> &
    IPotComponentColorConfig<TPotRadioColorVarsList>
);

/** PotRadio */
export interface IPotRadioConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {}

