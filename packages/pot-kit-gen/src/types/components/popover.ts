// Types
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'popover';

type TStateVars = {
    /** Цвет рамки */
    border: string;

    /** Цвет фона */
    background: string;

    /** Цвет текста */
    text: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>;

/** PotPopover */
export interface IPotPopoverConfig<TSize extends string = string> extends TConfig<TSize> {
    color?: {
        /** Базовая расцветка */
        base?: TStateVars;
    };

    size?: {
        [key in TSize]: {
            /** Текст */
            text: string | number;

            /** Паддинг */
            padding: string | number;

            /** Размер рамки */
            border: string | number;

            /** Тень */
            shadow: string;
        };
    };
}
