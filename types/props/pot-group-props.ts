// Types
import { TPotAlign, TPotAlignContent, TPotGroupDirection, TPotGroupWrap, TPotJustify, TPotJustifyItems } from "./pot-base";

export interface IPotGroupProps<
    TDevice extends string = string,
    TGap extends string = string
> {
    /** Тег элемента задающего сетку */
    tag?: string;

    /** align-items сетки */
    align?: TPotAlign | TPotAlign[] | null;

    /** align-content сетки */
    alignContent?: TPotAlignContent | TPotAlignContent[] | null;

    /** justify-content сетки */
    justify?: TPotJustify | TPotJustify[] | null;

    /** justify-items сетки */
    justifyItems?: TPotJustifyItems | TPotJustifyItems[] | null;

    /** Направление сетки */
    direction?: TPotGroupDirection | TPotGroupDirection[] | null;

    /** Тип переноса невмещаюхихся в сетку элементов */
    wrap?: TPotGroupWrap | TPotGroupWrap[] | null;

    /** Размер отступов сетки */
    gap?: TGap | TGap[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: TDevice[];
}