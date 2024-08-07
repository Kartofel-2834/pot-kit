/**
 * Интерфейс пропсов для компонента PotLink
 *
 * @property {string} [tag] - HTML-тег кнопки. По умолчанию - 'a'.
 * @property {string | null} [link] - URL ссылки, нужен для работы автоматического определения target.
 * @property {string | null} [target] - target ссылки, если значение null, то ссылка будет открываться в новом окне для внешних URL-ов.
 * @property {string} [toAttribute] - атрибут используемый для ссылки, по умолчанию - 'href'.
 * @property {string | string[]} [color] - Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна.
 * @property {string | string[]} [breakpoints] - Точки останова для адаптивного дизайна
 * @property {string} [icon] - Иконка после текста кнопки.
 * @property {string} [preicon] - Иконка до текста кнопки.
 * @property {boolean} [disabled] - Если true, то ссылка будет заблокирована и не активна.
 * @property {boolean} [underline] - Если true, то ссылка будет подчеркиваться снизу при наведении.
 */
export interface IPotLinkProps {
    tag?: string;
    link?: string | null;
    toAttribute?: string;
    target?: string | null;
    color?: string | string[];
    breakpoints?: string | string[];
    icon?: string;
    preicon?: string;
    disabled?: boolean;
    underline?: boolean;
}
