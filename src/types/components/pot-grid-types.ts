// Types
import type { EPotDevice, EPotGap } from "@/enums/preset";
import type { TPotAlign, TPotAlignContent, TPotJustify, TPotJustifyItems } from "./pot-base";

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

    /** align-items сетки */
    align?: TPotAlign | TPotAlign[] | null;

    /** align-content сетки */
    alignContent?: TPotAlignContent | TPotAlignContent[] | null;

    /** justify-content сетки */
    justify?: TPotJustify | TPotJustify[] | null;

    /** justify-items сетки */
    justifyItems?: TPotJustifyItems | TPotJustifyItems[] | null;

    /** Размер отступов сетки */
    gap?: EPotGap | EPotGap[] | null; 

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}
