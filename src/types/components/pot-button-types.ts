// Enums
import type { EPotColor, EPotDevice, EPotSize, EPotRadius } from "@/enums/preset";

/**
 * Интерфейс пропсов для компонента PotButton
 */
export interface IPotButtonProps {
    /** HTML-тег кнопки. По умолчанию - 'button' */
    tag?: string;

    /** Размер кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: EPotSize | EPotSize[] | null;

    /** Цвет кнопки. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EPotColor | EPotColor[] | null;

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

    unstyled?: boolean;
}
