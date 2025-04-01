// Types
import {
    IPotComponentColorConfig,
    IPotComponentConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";
import { IPotCheckboxProps } from "../props/pot-checkbox-props";

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> = (
    IPotComponentConfig<IPotCheckboxProps<TDevice, TColor, TSize, TRadius>> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig
);

/* PotCheckbox */
export interface IPotCheckboxConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> extends TConfig<TDevice, TColor, TSize, TRadius> {
    color: {
        /** Цвет текста */
        text: string;

        /** Цвет фона */
        background: string;

        /** Цвет иконки */
        icon: string;

        /** Цвет рамки */
        border: string;

        /** Цвет текста при наведении */
        hoverText: string;

        /** Цвет рамки при наведении */
        hoverBorder: string;

        /** Цвет фона при наведении */
        hoverBackground: string;

        /** Цвет иконки при наведении */
        hoverIcon: string;

        /** Цвет текста при нажатии */
        pressedText: string;

        /** Цвет рамки при нажатии */
        pressedBorder: string;

        /** Цвет фона при нажатии */
        pressedBackground: string;

        /** Цвет иконки при нажатии */
        pressedIcon: string;

        /* -------------------------------------------------------- */

        /** Цвет текста выбранного чекбокса */
        checkedText: string;

        /** Цвет рамки выбранного чекбокса */
        checkedBorder: string;

        /** Цвет фона выбранного чекбокса */
        checkedBackground: string;

        /** Цвет иконки выбранного чекбокса */
        checkedIcon: string;

        /** Цвет текста при наведении на выбранный чекбокс */
        checkedHoverText: string;

        /** Цвет рамки при наведении на выбранный чекбокс */
        checkedHoverBorder: string;

        /** Цвет фона при наведении на выбранный чекбокс */
        checkedHoverBackground: string;

        /** Цвет иконки при наведении на выбранный чекбокс */
        checkedHoverIcon: string;

        /** Цвет текста при нажатии на выбранный чекбокс */
        checkedPressedText: string;

        /** Цвет рамки при нажатии на выбранный чекбокс */
        checkedPressedBorder: string;

        /** Цвет фона при нажатии на выбранный чекбокс */
        checkedPressedBackground: string;

        /** Цвет иконки при нажатии на выбранный чекбокс */
        checkedPressedIcon: string;

        /* -------------------------------------------------------- */

        /** Цвет текста невалидного чекбокса */
        invalidText: string;

        /** Цвет рамки невалидного чекбокса */
        invalidBorder: string;

        /** Цвет фона невалидного чекбокса */
        invalidBackground: string;

        /** Цвет иконки невалидного чекбокса */
        invalidIcon: string;

        /* -------------------------------------------------------- */

        /** Цвет текста заблокированного чекбокса */
        disabledText: string;

        /** Цвет рамки заблокированного чекбокса */
        disabledBorder: string;

        /** Цвет фона заблокированного чекбокса */
        disabledBackground: string;

        /** Цвет иконки заблокированного чекбокса */        
        disabledIcon: string;
    };

    size: {
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
        }
    };
}