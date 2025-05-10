// Types
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'button';

type TStateVars = {
    /** Цвет рамки */
    border: string;

    /** Цвет фона */
    background: string;

    /** Цвет текста */
    text: string;

    /** Цвет обводки */
    outline: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>;

/** PotButton */
export interface IPotButtonConfig<TSize extends string = string> extends TConfig<TSize> {
    color?: {
        /** Базовая расцветка */
        base?: TStateVars;

        /** Расцветка при наведении */
        hover?: TStateVars;

        /** Расцветка при нажатии */
        pressed?: TStateVars;

        /** Расцветка заблокированной кнопки */
        disabled?: TStateVars;
    };

    size?: {
        [key in TSize]: {
            /** Высота */
            height: string | number;

            /** Текст */
            text: string | number;

            /** Паддинг */
            padding: string | number;

            /** Размер рамки */
            border: string | number;

            /** Размер обводки */
            outline: string | number;

            /** Отступ рамки от кнопки */
            'outline-offset': string | number;
        };
    };
}
