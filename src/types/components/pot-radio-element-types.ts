// Types
import type { DeviceBreakpoint } from "../composables";

export interface IPotRadioElementProps {
    /** HTML-тег элемента. По умолчанию - 'div' */
    tag?: string;

    /** Цвет элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: string | string[];

    /** Скругление маркеров. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: string | string[];

    /** Точки останова для адаптивного дизайна */
    breakpoints?: DeviceBreakpoint[];

    /** Флаг, указывающий на то, активен ли элемент радио-списка */
    active?: boolean;

    /** Если true, то элемент списка будет заблокирован и не активен */
    disabled?: boolean;
}