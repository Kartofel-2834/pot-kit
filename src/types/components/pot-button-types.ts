/**
 * Интерфейс пропсов для компонента PotButton
 */
export interface IPotButtonProps {
    /**
     * HTML-тег кнопки. По умолчанию - 'button'
     */
    tag?: string;

    /**
     * Размер кнопки. Может быть одним значением или массивом значений для адаптивного дизайна
     */
    size?: string | string[];

    /**
     * Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна
     */
    color?: string | string[];

    /**
     * Радиус границ кнопки. Может быть одним значением или массивом значений для адаптивного дизайна
     */
    radius?: string | string[];

    /**
     * Точки останова для адаптивного дизайна
     */
    breakpoints?: string | string[];

    /**
     * Иконка после текста кнопки
     */
    icon?: string;

    /**
     * Иконка до текста кнопки
     */
    preicon?: string;

    /**
     * Если true, то длина кнопки будет равна ширине из пропа size
     */
    square?: boolean;

    /**
     * Если true, то кнопка будет заблокирована и не активна
     */
    disabled?: boolean;
}
