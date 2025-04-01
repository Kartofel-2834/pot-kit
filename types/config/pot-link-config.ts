// Types
import { IPotLinkProps } from "../props/pot-link-props";
import {
    IPotComponentConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig
} from "./pot-component-config";

type TConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
> = (
    IPotComponentConfig<IPotLinkProps<TDevice, TColor, TSize>> & 
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig
)

/** PotInput */
export interface IPotLinkConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
> extends TConfig<TDevice, TColor, TSize> {
    color: {
        /** Цвет текста */
        text: string;

        /** Цвет иконки */
        icon: string;

        /** Цвет линии */
        line: string;

        /** Цвет текста при наведении */
        hoverText: string;

        /** Цвет иконки при наведении */
        hoverIcon: string;

        /** Цвет линии при наведении */
        hoverLine: string;

        /** Цвет текста при нажатии */
        pressedText: string;

        /** Цвет иконки при нажатии */
        pressedIcon: string;

        /** Цвет линии при нажатии */
        pressedLine: string;

        /** Цвет текста активной ссылки */
        activeText: string;

        /** Цвет иконки активной ссылки */
        activeIcon: string;

        /** Цвет линии активной ссылки */
        activeLine: string;

        /** Цвет текста активной ссылки при наведении */
        activeHoverText: string;

        /** Цвет иконки активной ссылки при наведении */
        activeHoverIcon: string;

        /** Цвет линии активной ссылки при наведении */
        activeHoverLine: string;

        /** Цвет текста активной ссылки при нажатии */
        activePressedText: string;

        /** Цвет иконки активной ссылки при нажатии */
        activePressedIcon: string;

        /** Цвет линии активной ссылки при нажатии */
        activePressedLine: string;

        /** Цвет текста заблокированной ссылки */
        disabledText: string;

        /** Цвет иконки заблокированной ссылки */
        disabledIcon: string;

        /** Цвет линии заблокированной ссылки */
        disabledLine: string;
    };

    size: {
        [key in TSize]: {
            /** Размер текста */
            text: string | number;

            /** Размер подчеркивания */
            line: string | number;

            /** Размер иконки */
            icon: string | number;
        };
    };
} 