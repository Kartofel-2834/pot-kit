// Types
import type { EPotDevice } from "@/enums/preset";
import type { TPotAlign, TPotJustify } from "./pot-base";

export interface IPotGroupItemProps {
    /** Тег элемента сетки */
    tag?: string;

    /** Порядок расположения элемента в сетке */
    order?: number | number[] | `${number}` | `${number}`[];

    /** Растягивание элемента в сетке */
    grow?: number | number[] | `${number}` | `${number}`[];

    /** Сжатие элемента в сетке */
    shrink?: number | number[] | `${number}` | `${number}`[];

    /** Сжатие элемента в сетке */
    basis?: string | string[];

    /* justify-self элемента сетки */
    justify?: TPotJustify | TPotJustify[] | null;

    /* align-self элемента сетки */
    align?: TPotAlign | TPotAlign[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}
