
type TSpecValue = string | number | boolean | null;

/**
 * Интерфейс пропсов для компонента PotCheckbox
 */
export interface IPotCheckboxProps<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> {
    /** Текущее значение чекбокса */
    value?: TSpecValue;

    /** Текущее значение чекбокса */
    modelValue?: TSpecValue;

    /** Если чекбокс в состоянии checked, то value = trueValue */
    trueValue?: TSpecValue;

    /** Если чекбокс не в состоянии checked, то value = falseValue */
    falseValue?: TSpecValue;

    /** Если true, то чекбокс будет задизейблен */
    disabled?: boolean;

    /** Если true, то чекбокс будет невалиден */
    invalid?: boolean;

    /** Иконка в чекбоксе, галочка по-умолчанию */
    icon?: string;

    /** Цвет чекбокса */
    color?: TColor | TColor[] | null;

    /** Размер чекбокса, null для скейла от шрифта */
    size?: TSize | TSize[] | null;

    /** Радиус границ чекбокса */
    radius?: TRadius | TRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: TDevice[];
}
