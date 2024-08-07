/**
 * Интерфейс пропсов для компонента PotButton
 *
 * @property {string} [tag] - HTML-тег кнопки. По умолчанию - 'button'.
 * @property {string | string[]} [size] - Размер кнопки. Может быть одним значением или массивом значений для адаптивного дизайна.
 * @property {string | string[]} [color] - Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна.
 * @property {string | string[]} [radius] - Радиус границ кнопки. Может быть одним значением или массивом значений для адаптивного дизайна.
 * @property {string | string[]} [breakpoints] - Точки останова для адаптивного дизайна
 * @property {string} [icon] - Иконка после текста кнопки.
 * @property {string} [preicon] - Иконка до текста кнопки.
 * @property {boolean} [square] - Если true, то длина кнопки будет равна ширине из пропа size.
 * @property {boolean} [disabled] - Если true, то кнопка будет заблокирована и не активна.
 */
export interface IPotButtonProps {
    tag?: string;
    size?: string | string[];
    color?: string | string[];
    radius?: string | string[];
    breakpoints?: string | string[];
    icon?: string;
    preicon?: string;
    square?: boolean;
    disabled?: boolean;
}
