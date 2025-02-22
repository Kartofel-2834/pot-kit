// Types
import type { TSpecValue } from "../composables";
import type { EPotRadius } from "@/enums/components";
import type { EPotDevice, EPotColorTheme, EPotSize } from "@/enums/config";

export interface IPotSwitchProps<T extends TSpecValue> {
    /** Текущее значение переключателя */
    value?: T;

    /** Текущее значение переключателя */
    modelValue?: T;

    /** Если переключатель в состоянии checked, то value = trueValue */
    trueValue?: T;

    /** Если переключатель не в состоянии checked, то value = falseValue */
    falseValue?: T;

    /** Контент переключателя в активном состоянии */
    trueLabel?: string;

    /** Контент переключателя в не активном состоянии */
    falseLabel?: string;

    /** Если true, то переключатель будет задизейблен */
    disabled?: boolean;

    /** Иконка в переключателе, пустая по-умолчанию */
    icon?: string;

    /** Цвет переключателя */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Размер переключателя, null для скейла от шрифта */
    size?: EPotSize | EPotSize[] | null;

    /** Радиус границ переключателя */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}

export interface IPotSwitchSlots {
    default: () => unknown;
    'true-content': () => unknown;
    'false-content': () => unknown;
}

