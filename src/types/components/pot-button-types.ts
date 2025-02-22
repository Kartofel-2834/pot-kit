// Enums
import type { EPotRadius } from "@/enums/components";
import type { EPotColorTheme, EPotDevice, EPotSize } from "@/enums/config";

/**
 * Интерфейс пропсов для компонента PotButton
 */
export interface IPotButtonProps {
    /** HTML-тег кнопки. По умолчанию - 'button' */
    tag?: string;

    /** Размер кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: EPotSize | EPotSize[];

    /** Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Радиус границ кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Иконка после текста кнопки */
    icon?: string;

    /** Иконка до текста кнопки */
    preicon?: string;

    /** Если true, то длина кнопки будет равна ширине из пропа size */
    square?: boolean;

    /** Если true, то кнопка будет заблокирована и не активна */
    disabled?: boolean;
}
