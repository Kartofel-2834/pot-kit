// Types
import type { TPotTooltipPosition } from './pot-base';

/**
 * Интерфейс пропсов для компонента PotTooltip
 */
export interface IPotTooltipProps<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string,
    TRadius extends string = string
> {
    /**
     * Флаг для кастомного отображения тултипа
     * (по-умолчанию он открывается и закрывается на hover)
    */
    visible?: boolean;
    
    /** Задержка перед закрытием тултипа (нужна для возможности перевести на него курсор) */
    closeDelay?: number;

    /**
     * Флаг указывающий на то, что положение тултипа не должно
     * изменяться вне зависимости от его положения на экране 
    */
    fixed?: boolean;

    /** Если true, то тултип будет закрываться не на v-if, а на v-show */
    persistent?: boolean;

    /** Анимация появления тултипа */
    transition?: string | string[] | null;

    /** Отступ тултипа от target в пикселях */
    offset?: number | number[];

    /** Отступ тултипа от краев экрана в пикселях */
    screenOffset?: number | number[];

    /** Текст тултипа */
    text?: string;

    /** Положение тултипа */
    position?: TPotTooltipPosition | TPotTooltipPosition[];

    /** Размер тултипа */
    size?: TSize | TSize[];

    /** Цветовая тема тултипа */
    color?: TColor | TColor[];

    /** Скругление краев тултипа */
    radius?: TRadius | TRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: TDevice[];
}