// Types
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'radio' | 'marker';

type TStateVars = {
    /** Цвет рамки */
    border: string;

    /** Цвет фона */
    background: string;

    /** Цвет текста */
    text: string;

    /** Цвет точки */
    point: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>;

/** PotRadio */
export interface IPotRadioConfig<TSize extends string = string> extends TConfig<TSize> {
    color: {
        /** Базовая расцветка */
        base?: TStateVars;

        /** Расцветка при наведении */
        hover?: TStateVars;

        /** Расцветка при нажатии */
        pressed?: TStateVars;

        /** Расцветка выбранного радио */
        checked?: TStateVars;

        /** Расцветка при наведении на выбранный радио */
        checkedHover?: TStateVars;

        /** Расцветка при нажатии на выбранный радио */
        checkedPressed?: TStateVars;

        /** Расцветка невалидного радио */
        invalid?: TStateVars;

        /** Расцветка заблокированного радио */
        disabled?: TStateVars;
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
}
