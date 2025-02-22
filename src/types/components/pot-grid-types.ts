// Enums
import type { EPotGap } from "@/enums/components";
import type { EPotDevice, EPotSize } from "@/enums/config";

/**
 * Интерфейс пропсов для компонента PotGrid
 */
export interface IPotGridProps {
    /** Тег элемента задающего сетку */
    tag?: string;

    /** Кол-во колонок в сетке */
    cols?: number | number[] | string | string[];

    /** Кол-во рядов в сетке */
    rows?: number | number[] | string | string[];

    /** Направление сетки */
    flow?: string | string[];

    /** Высота элемента выходящего за заданную сетку */
    autoRows?: string | string[];
    
    /** Длина элемента выходящего за заданную сетку */
    autoCols?: string | string[];

    /** Размер отступов сетки */
    gap?: EPotGap | EPotGap[] | number | number[] | null; 

    /** Размер элементов сетки. Может быть одним значением или массивом значений для адаптивного дизайна */
    size?: EPotSize | EPotSize[];

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}
