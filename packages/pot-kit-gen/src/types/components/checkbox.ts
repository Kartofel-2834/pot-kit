// Types
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'checkbox' | 'target' | 'iconWrapper' | 'icon' | 'label';

type TStateVars = {
    /** Цвет текста */
    text: string;

    /** Цвет фона */
    background: string;

    /** Цвет иконки */
    icon: string;

    /** Цвет рамки */
    border: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>;

/* PotCheckbox */
export interface IPotCheckboxConfig<TSize extends string = string> extends TConfig<TSize> {
    color?: {
        /** Базовая расцветка */
        base?: TStateVars;

        /** Расцветка при наведении */
        hover?: TStateVars;

        /** Расцветка при нажатии */
        pressed?: TStateVars;

        /** Расцветка выбранного чекбокса */
        checked?: TStateVars;

        /** Расцветка при наведении на выбранный чекбокс */
        checkedHover?: TStateVars;

        /** Расцветка при нажатии на выбранный чекбокс */
        checkedPressed?: TStateVars;

        /** Расцветка невалидного чекбокса */
        invalid?: TStateVars;

        /** Расцветка заблокированного чекбокса */
        disabled?: TStateVars;
    };

    size?: {
        [key in TSize]: {
            /** Размер текста */
            text: string | number;

            /** Высота */
            height: string | number;

            /** Размер иконки */
            icon: string | number;

            /** Размер рамки */
            border: string | number;

            /** Размер расстояния между чекбоксом и его текстом */
            gap: string | number;
        };
    };
}
