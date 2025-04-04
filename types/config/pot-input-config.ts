// Types
import { IPotInputBaseProps } from "../props/pot-input-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";

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

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotInputBaseProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>
)

/** PotInput */
export interface IPotInputConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {
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