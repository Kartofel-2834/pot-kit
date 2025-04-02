// Types
import { IPotButtonProps } from "../props/pot-button-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from "./pot-component-config";

type TStatesList = 'base' | 'hover' | 'pressed' | 'disabled';

type TStateVars = {
    /** Цвет рамки */
    border: string;

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
    IPotComponentConfig<IPotButtonProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars, TStatesList>
);

/** PotButton */
export interface IPotButtonConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {
    size?: {
        [key in TSize]: {
            /** Высота */
            height: string | number;

            /** Текст */
            text: string | number;

            /** Паддинг */
            padding: string | number;
 
            /** Паддинг текста */
            gap: string | number;

            /** Размер рамки */
            border: string | number;

            /** Размер иконки */
            icon: string | number;
        }
    };
}