/**
 * Допустимый value для компонента PotCheckbox
 */
export type CheckboxValue = string | number | boolean | null;

/**
 * Интерфейс пропсов для компонента PotButton
 *
 * @property {CheckboxValue} [value] - текущее значение чекбокса.
 * @property {CheckboxValue} [modelValue] - то же что и value, для поддержки v-model.
 * @property {CheckboxValue} [trueValue] - если чекбокс в состоянии checked, то value = trueValue.
 * @property {CheckboxValue} [falseValue] - если чекбокс не в состоянии checked, то value = falseValue.
 * @property {boolean} [disabled] - Если true, то чекбокс будет задизейблен.
 * @property {string} [icon] - Иконка в чекбоксе, галочка по-умолчанию.
 * @property {string} [color] - Цвет чекбокса.
 * @property {string} [breakpoints] - Точки останова для адаптивного дизайна.
 */
export interface IPotCheckboxProps {
    value?: CheckboxValue;
    modelValue?: CheckboxValue;
    trueValue?: CheckboxValue;
    falseValue?: CheckboxValue;
    disabled?: boolean;
    icon?: string;
    color?: string;
    breakpoints?: string | string[];
}
