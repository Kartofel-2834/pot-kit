// Types
import type { TSpecValue } from "../composables";

// Enums
import type { ERadius } from "@/enums/components";
import type { EDevice, EColorTheme, ESize } from "@/enums/config";

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
    color?: EColorTheme | EColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: ESize | ESize[] | null;

    /** Радиус границ чекбокса */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}
