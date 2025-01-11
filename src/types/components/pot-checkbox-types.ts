// Enums
import type { ERadius, ESize } from "@/enums/components";
import type { EDevice, EColorTheme, EIcon } from "@/enums/config";

/**
 * Допустимый value для компонента PotCheckbox
 */
export type CheckboxValue = string | number | boolean | null;

/**
 * Интерфейс пропсов для компонента PotCheckbox
 */
export interface IPotCheckboxProps {
    /** Текущее значение чекбокса */
    value?: CheckboxValue;

    /** Текущее значение чекбокса */
    modelValue?: CheckboxValue;

    /** Если чекбокс в состоянии checked, то value = trueValue */
    trueValue?: CheckboxValue;

    /** Если чекбокс не в состоянии checked, то value = falseValue */
    falseValue?: CheckboxValue;

    /** Если true, то чекбокс будет задизейблен */
    disabled?: boolean;

    /** Иконка в чекбоксе, галочка по-умолчанию */
    icon?: EIcon | null;

    /** Цвет чекбокса */
    color?: EColorTheme | EColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: ESize | ESize[] | null;

    /** Радиус границ чекбокса */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}
