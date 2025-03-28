// Enums
import type { EPotDevice } from "@/enums/preset";
import type { TPotAlign, TPotJustify } from "./pot-base";

/**
 * Интерфейс пропсов для компонента PotGridCell
 */
export interface IPotGridCell {
    /** Тег элемента сетки */
    tag?: string;

    /** Колонка, в которой расположен элемент */
    col?: number | number[] | string | string[];

    /** Ряд, в котором расположен элемент */
    row?: number | number[] | string | string[];

    /* justify-self элемента сетки */
    justify?: TPotJustify | TPotJustify[] | null; 

    /* align-self элемента сетки */
    align?: TPotAlign | TPotAlign[] | null; 

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}