// Types
import type { ISpecsProps } from '@/types/composables/specs-helper-types';

/**
 * Интерфейс пропсов для компонента PotRadio
 */
export interface IPotRadioProps extends ISpecsProps {
    /** HTML-тег радио-листа. По умолчанию - 'ul' */
    tag?: string;

    /** HTML-тег элемента радио-листа. По умолчанию - 'li' */
    radioTag?: string;

    /** Цвет элементов списка */
    color?: string | string[];

    /** Скругление маркеров элементов списка */
    radius?: string | string[];

    /** Точки останова для адаптивного дизайна */
    breakpoints?: string | string[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;
}
