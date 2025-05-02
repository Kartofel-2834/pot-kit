/**
 * Пропсы UiButton
 */
export interface IUiButtonProps<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> {
    /** HTML-тег кнопки. По умолчанию - 'button' */
    tag?: string;

    /** Размер кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: TSize | TSize[] | null;

    /** Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: TColor | TColor[] | null;

    /** Радиус границ кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: TRadius | TRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: TDevice[];

    /** Иконка после текста кнопки */
    icon?: string;

    /** Иконка до текста кнопки */
    preicon?: string;

    /** Если true, то длина кнопки будет равна ширине из пропа size */
    square?: boolean;

    /** Если true, то кнопка будет заблокирована и не активна */
    disabled?: boolean;
}
