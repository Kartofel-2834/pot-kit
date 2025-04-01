// Types
import { IPotButtonProps } from "../props/pot-button-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from "./pot-component-config";

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotButtonProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig
);

/** PotButton */
export interface IPotButtonConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {
    color: {
        /** Цвет рамки */
        border: string;

        /** Цвет фона */
        background: string;

        /** Цвет текста */
        text: string;

        /** Цвет рамки при наведении */
        hoverBorder: string;

        /** Цвет фона при наведении */
        hoverBackground: string;

        /** Цвет текста при наведении */
        hoverText: string;

        /** Цвет рамки при нажатии */
        pressedBorder: string;

        /** Цвет фона при нажатии */
        pressedBackground: string;

        /** Цвет текста при нажатии */
        pressedText: string;

        /** Цвет рамки у неактивной кнопки */
        disabledBorder: string;

        /** Цвет фона у неактивной кнопки */
        disabledBackground: string;

        /** Цвет текста у неактивной кнопки */
        disabledText: string;
    };

    size: {
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