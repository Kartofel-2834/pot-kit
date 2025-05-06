// Types
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from './component';

type TClassList = 'link' | 'icon';

type TStateVars = {
    /** Цвет текста */
    text: string;

    /** Цвет иконки */
    icon: string;

    /** Цвет линии */
    line: string;
};

type TConfig<TSize extends string = string> = IPotComponentClassConfig<TClassList> &
    IPotComponentSizeConfig<TSize> &
    IPotComponentColorConfig;

/** PotInput */
export interface IPotLinkConfig<TSize extends string = string> extends TConfig<TSize> {
    color?: {
        /** Базовая расцветка */
        base?: TStateVars;

        /** Расцветка при наведении */
        hover?: TStateVars;

        /** Расцветка при нажатии */
        pressed?: TStateVars;

        /** Расцветка активной ссылки */
        active?: TStateVars;

        /** Расцветка активной ссылки при наведении */
        activeHover?: TStateVars;

        /** Расцветка активной ссылки при нажатии */
        activePressed?: TStateVars;

        /** Расцветка подчеркнутой ссылки */
        underline?: TStateVars;

        /** Расцветка подчеркнутой ссылки при наведении */
        underlineHover?: TStateVars;

        /** Расцветка подчеркнутой ссылки при нажатии */
        underlinePressed?: TStateVars;

        /** Расцветка активной подчеркнутой ссылки */
        underlineActive?: TStateVars;

        /** Расцветка активной подчеркнутой ссылки при наведении */
        underlineActiveHover?: TStateVars;

        /** Расцветка активной подчеркнутой ссылки при нажатии */
        underlineActivePressed?: TStateVars;

        /** Расцветка заблокированной ссылки */
        disabled?: TStateVars;
    };

    size?: {
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
