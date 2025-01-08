// Enums
import { EDevice, EColorTheme } from "@/enums/config";
import { ERadius, ESize } from "@/enums/components";

export interface IPotRadioElementProps {
    /** HTML-тег элемента. По умолчанию - 'div' */
    tag?: string;

    /** Цвет элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    color?: EColorTheme | EColorTheme[];

    /** Размер элемента. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: ESize | ESize[] | null;

    /** Скругление маркеров. Может быть одним значением или массивом значений для адаптивного дизайна */
    radius?: ERadius | ERadius[];

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];

    /** Флаг, указывающий на то, активен ли элемент радио-списка */
    active?: boolean;

    /** Если true, то элемент списка будет заблокирован и не активен */
    disabled?: boolean;
}