// Types
import type { EPotDevice, EPotColor, EPotSize, EPotRadius } from "@/enums/preset";

export interface IPotRadioProps {
    /** HTML-тег элемента. По умолчанию - 'div' */
    tag?: string;

    /** Цвет элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EPotColor | EPotColor[]; 

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