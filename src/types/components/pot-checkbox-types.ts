// Enums
import type { EDevice, EColorTheme } from "@/enums/config";

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
    icon?: string;

    /** Цвет чекбокса */
    color?: EColorTheme | EColorTheme[];

    /** Точки останова для адаптивного дизайна */
    breakpoints?: EDevice[];
}
