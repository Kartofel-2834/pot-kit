// Types
import type { IPotTooltipProps } from "../props/pot-tooltip-props";
import type {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from "./pot-component-config";

type TStateVars = {
    /** Тень */
    shadow: string;

    /** Цвет фона */
    background: string;

    /** Цвет текста */
    text: string;
}

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotTooltipProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>
);

/** PotTooltip */
export interface IPotTooltipConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {
    color?: {
        /** Базовые стили */
        base?: TStateVars;
    };

    size?: {
        [key in TSize]: {
            /** Текст */
            text: string | number;

            /** Паддинг */
            padding: string | number;
        };
    };
}