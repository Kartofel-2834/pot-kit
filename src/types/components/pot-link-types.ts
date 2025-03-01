// Types
import type { EPotDevice, EPotColorTheme, EPotSize } from "@/enums/preset";

/**
 * Интерфейс пропсов для компонента PotLink
 */
export interface IPotLinkProps {
    /** HTML-тег ссылки. По умолчанию - 'a' */
    tag?: string;

    /** URL ссылки, нужен для работы автоматического определения target */
    link?: string | null;

    /** Атрибут используемый для ссылки, по умолчанию - 'href' */
    toAttribute?: string;

    /** target ссылки, если значение null, то ссылка будет открываться в новом окне для внешних URL-ов */
    target?: string | null;

    /** Цвет ссылки. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Размер ссылки. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: EPotSize | EPotSize[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Иконка после текста ссылки */
    icon?: string;

    /** Иконка до текста ссылки */
    preicon?: string;

    /** Если true, то ссылка будет заблокирована и не активна */
    disabled?: boolean;

    /** Если true, то ссылка будет подчеркиваться снизу при наведении */
    underline?: boolean;

    /** Если true, то ссылка будет в активном состоянии */
    active?: boolean;
}
