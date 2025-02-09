// Enums
import type { ERadius } from "@/enums/components";
import type { EColorTheme, EDevice, EIcon, ESize } from "@/enums/config";

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
    devices?: EDevice[];

    /** Иконка после текста кнопки */
    icon?: EIcon | null;

    /** Иконка до текста кнопки */
    preicon?: EIcon | null;

    /** Если true, то длина кнопки будет равна ширине из пропа size */
    square?: boolean;

    /** Если true, то кнопка будет заблокирована и не активна */
    disabled?: boolean;
}
