// Types
import type { EPotDevice, EPotColorTheme, EPotSize } from "@/enums/config";
import type { EPotRadius } from "@/enums/components";

export interface IPotRadioElementProps {
    /** HTML-тег элемента. По умолчанию - 'div' */
    tag?: string;

    /** Цвет элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Размер элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: EPotSize | EPotSize[] | null;

    /** Скругление маркеров. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Флаг, указывающий на то, активен ли элемент радио-списка */
    active?: boolean;

    /** Если true, то элемент списка будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то элемент списка будет невалиден */
    invalid?: boolean;
}