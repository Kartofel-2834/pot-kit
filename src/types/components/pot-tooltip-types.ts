// Types
import type { RendererElement } from "vue";

// Enums
import { EColorTheme, ESize, EDevice } from "@/enums/config";
import { ETooltipPosition, ERadius } from "@/enums/components";

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
    position?: ETooltipPosition | ETooltipPosition[];

    /** Размер тултипа */
    size?: ESize | ESize[];

    /** Цветовая тема тултипа */
    color?: EColorTheme | EColorTheme[];

    /** Скругление краев тултипа */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}