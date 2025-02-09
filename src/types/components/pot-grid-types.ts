// Enums
import type { EDevice, ESize } from "@/enums/config";

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
    size?: ESize | ESize[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}
