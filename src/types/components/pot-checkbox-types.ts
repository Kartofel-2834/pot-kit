/**
 * Допустимый value для компонента PotCheckbox
 */
export type CheckboxValue = string | number | boolean | null;

/**
 * Интерфейс пропсов для компонента PotCheckbox
 */
export interface IPotCheckboxProps {
    /**
     * текущее значение чекбокса
     */
    value?: CheckboxValue;

    /**
     * текущее значение чекбокса
     */
    modelValue?: CheckboxValue;

    /**
     * если чекбокс в состоянии checked, то value = trueValue
     */
    trueValue?: CheckboxValue;

    /**
     * если чекбокс не в состоянии checked, то value = falseValue
     */
    falseValue?: CheckboxValue;

    /**
     * Если true, то чекбокс будет задизейблен
     */
    disabled?: boolean;

    /**
     * иконка в чекбоксе, галочка по-умолчанию
     */
    icon?: string;

    /**
     * цвет чекбокса
     */
    color?: string;

    /**
     * точки останова для адаптивного дизайна
     */
    breakpoints?: string | string[];
}
