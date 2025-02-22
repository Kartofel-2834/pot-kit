// Types
import type { RendererElement, VNode } from "vue";
import type { EPotColorTheme, EPotSize, EPotDevice } from "@/enums/config";
import type { EPotTooltipPosition, EPotRadius } from "@/enums/components";

/**
 * Интерфейс пропсов для компонента PotTooltip
 */
export interface IPotTooltipProps {
    /**
     * Флаг для кастомного отображения тултипа
     * (по-умолчанию он открывается и закрывается на hover)
    */
    visible?: boolean;
    
    /** Элемент в который будет встроен тултип */
    to?: string | RendererElement | null;

    /** Элемент к которому будет привязан тултип */
    target?: HTMLElement | null;

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
    position?: EPotTooltipPosition | EPotTooltipPosition[];

    /** Размер тултипа */
    size?: EPotSize | EPotSize[];

    /** Цветовая тема тултипа */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Скругление краев тултипа */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}


/** Интерфейс слотов для компонента PotTooltip */
export interface IPotTooltipSlots {
    default: () => VNode[];
    tooltip: () => VNode[];
    content: () => VNode[];
}