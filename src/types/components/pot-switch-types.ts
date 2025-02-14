// Types
import type { TCheckboxValue } from "./pot-checkbox-types";

// Enums
import type { ERadius } from "@/enums/components";
import type { EDevice, EColorTheme, ESize } from "@/enums/config";

export interface IPotSwitchProps {
    /** Текущее значение переключателя */
    value?: TCheckboxValue;

    /** Текущее значение переключателя */
    modelValue?: TCheckboxValue;

    /** Если переключатель в состоянии checked, то value = trueValue */
    trueValue?: TCheckboxValue;

    /** Если переключатель не в состоянии checked, то value = falseValue */
    falseValue?: TCheckboxValue;

    /** Контент переключателя в активном состоянии */
    trueLabel?: string;

    /** Контент переключателя в не активном состоянии */
    falseLabel?: string;

    /** Если true, то переключатель будет задизейблен */
    disabled?: boolean;

    /** Иконка в переключателе, пустая по-умолчанию */
    icon?: string;

    /** Цвет переключателя */
    color?: EColorTheme | EColorTheme[];

    /** Размер переключателя, null для скейла от шрифта */
    size?: ESize | ESize[] | null;

    /** Радиус границ переключателя */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}

export interface IPotSwitchSlots {
    default: () => unknown;
    'true-content': () => unknown;
    'false-content': () => unknown;
}

