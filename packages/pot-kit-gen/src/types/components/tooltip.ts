// Types
import type {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'tooltip' | 'tooltipWrapper';

type TStateVars = {
    /** Тень */
    shadow: string;

    /** Цвет фона */
    background: string;

    /** Цвет текста */
    text: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig<TStateVars>;

/** PotTooltip */
export interface IPotTooltipConfig<TSize extends string = string> extends TConfig<TSize> {
    color?: {
        /** Базовые стили */
        base?: TStateVars;
    };

    size?: {
        [key in TSize]: {
            /** Текст */
            text: string | number;

            /** Паддинг */
            padding: string | number;
        };
    };
}
