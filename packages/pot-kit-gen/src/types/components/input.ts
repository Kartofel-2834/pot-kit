// Types
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'input' | 'icon' | 'target';

type TStateVars = {
    /* Цвет рамки */
    border: string;

    /* Цвет фона */
    background: string;

    /* Цвет текста */
    text: string;

    /* Цвет иконки */
    icon: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>;

/** PotInput */
export interface IPotInputConfig<TSize extends string = string> extends TConfig<TSize> {
    color?: {
        /** Базовая расцветка */
        base?: TStateVars;

        /** Расцветка при наведении */
        hover?: TStateVars;

        /** Расцветка при нажатии */
        pressed?: TStateVars;

        /** Расцветка при фокусе */
        focused?: TStateVars;

        /** Расцветка при фокусе + наведении */
        focusedHover?: TStateVars;

        /** Расцветка при фокусе + нажатии */
        focusedPressed?: TStateVars;

        /** Расцветка невалидного инпута */
        invalid?: TStateVars;

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

            /** Паддинг текста */
            gap: string | number;

            /** Размер рамки */
            border: string | number;

            /** Размер иконки */
            icon: string | number;
        };
    };
}
