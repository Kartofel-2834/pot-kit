// Enums
import type { EGap } from "@/enums/components/EGap";
import type { EDevice } from "@/enums/config";

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
    gap?: EGap | EGap[] | number | number[] | null; 

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}
