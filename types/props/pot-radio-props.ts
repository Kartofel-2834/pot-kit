export interface IPotRadioProps<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string,
    TRadius extends string = string
> {
    /** HTML-тег элемента. По умолчанию - 'div' */
    tag?: string;

    /** Цвет элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: TColor | TColor[]; 

    /** Размер элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: TSize | TSize[] | null;

    /** Скругление маркеров. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: TRadius | TRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: TDevice[];

    /** Флаг, указывающий на то, активен ли элемент радио-списка */
    active?: boolean;

    /** Если true, то элемент списка будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то элемент списка будет невалиден */
    invalid?: boolean;
}