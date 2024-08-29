// Types
import type { ISpecsProps } from '@/types/composables/specs-helper-types';

/**
 * Интерфейс пропсов для компонента PotRadio
 */
export interface IPotRadioProps extends ISpecsProps {
    /**
     * HTML-тег радио-листа. По умолчанию - 'ul'
     */
    tag?: string;

    /**
     * HTML-тег элемента радио-листа. По умолчанию - 'li'
     */
    radioTag?: string;

    /**
     * Цвет элементов списка. Может быть одним значением или массивом значений для адаптивного дизайна
     */
    color?: string | string[];

    /**
     * Скругление маркеров элементов списка.
     * Может быть одним значением или массивом значений для адаптивного дизайна
     */
    radius?: string | string[];

    /**
     * Точки останова для адаптивного дизайна
     */
    breakpoints?: string | string[];

    /**
     * Если true, то список будет заблокирован и не активен
     */
    disabled?: boolean;
}

export interface IPotRadioElementProps {
    /**
     * HTML-тег элемента. По умолчанию - 'div'
     */
    tag?: string;

    /**
     * Цвет элемента. Может быть одним значением или массивом значений для адаптивного дизайна
     */
    color?: string | string[];

    /**
     * Скругление маркеров. Может быть одним значением или массивом значений для адаптивного дизайна
     */
    radius?: string | string[];

    /**
     * Точки останова для адаптивного дизайна
     */
    breakpoints?: string | string[];

    /**
     * Флаг, указывающий на то, активен ли элемент радио-списка
     */
    active?: boolean;

    /**
     * Если true, то элемент списка будет заблокирован и не активен
     */
    disabled?: boolean;
}
