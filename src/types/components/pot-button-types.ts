// Enums
import type { ESize, ERadius } from "@/enums/components";
import type { EColorTheme, EDevice } from "@/enums/config";

/**
 * Интерфейс пропсов для компонента PotButton
 */
export interface IPotButtonProps {
    /** HTML-тег кнопки. По умолчанию - 'button' */
    tag?: string;

    /** Размер кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: ESize | ESize[];

    /** Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EColorTheme | EColorTheme[];

    /** Радиус границ кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    breakpoints?: EDevice[];

    /** Иконка после текста кнопки */
    icon?: string;

    /** Иконка до текста кнопки */
    preicon?: string;

    /** Если true, то длина кнопки будет равна ширине из пропа size */
    square?: boolean;

    /** Если true, то кнопка будет заблокирована и не активна */
    disabled?: boolean;
}
