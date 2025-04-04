// Types
import { IPotRadioProps } from "../props/pot-radio-props";
import {
    IPotComponentColorConfig,
    IPotComponentConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";

type TStateVars = {
    /** Цвет рамки */
    border: string;

    /** Цвет фона */
    background: string;

    /** Цвет текста */
    text: string;

    /** Цвет точки */
    point: string;
}

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotRadioProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>
);

/** PotRadio */
export interface IPotRadioConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {
    color: {
        /** Базовая расцветка */
        base?: TStateVars,

        /** Расцветка при наведении */
        hover?: TStateVars,

        /** Расцветка при нажатии */
        pressed?: TStateVars,

        /** Расцветка выбранного радио */
        checked?: TStateVars,

        /** Расцветка при наведении на выбранный радио */
        checkedHover?: TStateVars,

        /** Расцветка при нажатии на выбранный радио */
        checkedPressed?: TStateVars,

        /** Расцветка невалидного радио */
        invalid?: TStateVars,

        /** Расцветка заблокированного радио */
        disabled?: TStateVars,
    };

    size?: {
        [key in TSize]: {
            /** Размер текста */
            text: string | number;

            /** Расстояние между текстом и маркером */
            gap: string | number;

            /** Размер маркера */
            marker: string | number;

            /** Толщина рамки маркера */
            markerBorder: string | number;

            /** Размер точки в маркере */
            markerPoint: string | number;
        };
    };
};

