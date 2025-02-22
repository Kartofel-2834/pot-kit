// Types
import type { TSpecValue } from "../composables";

// Enums
import type { EPotRadius } from "@/enums/components";
import type { EPotDevice, EPotColorTheme, EPotSize } from "@/enums/config";

/**
 * Интерфейс пропсов для компонента PotCheckbox
 */
export interface IPotCheckboxProps<T extends TSpecValue> {
    /** Текущее значение чекбокса */
    value?: T;

    /** Текущее значение чекбокса */
    modelValue?: T;

    /** Если чекбокс в состоянии checked, то value = trueValue */
    trueValue?: T;

    /** Если чекбокс не в состоянии checked, то value = falseValue */
    falseValue?: T;

    /** Если true, то чекбокс будет задизейблен */
    disabled?: boolean;

    /** Если true, то чекбокс будет невалиден */
    invalid?: boolean;

    /** Иконка в чекбоксе, галочка по-умолчанию */
    icon?: string;

    /** Цвет чекбокса */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: EPotSize | EPotSize[] | null;

    /** Радиус границ чекбокса */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}
