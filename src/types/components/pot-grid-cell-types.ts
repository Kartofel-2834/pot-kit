// Enums
import type { EPotDevice } from "@/enums/config";

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

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}