// Types
import type { ISpecsProps } from '@/types/composables/specs-helper-types';

// Enums
import { EDevice, EColorTheme } from '@/enums/config';
import { ERadius } from '@/enums/components';

/**
 * Интерфейс пропсов для компонента PotRadio
 */
export interface IPotRadioProps extends ISpecsProps {
    /** HTML-тег радио-листа. По умолчанию - 'ul' */
    tag?: string;

    /** HTML-тег элемента радио-листа. По умолчанию - 'li' */
    radioTag?: string;

    /** Цвет элементов списка */
    color?: EColorTheme | EColorTheme[];

    /** Скругление маркеров элементов списка */
    radius?: ERadius | ERadius[];

    /** Точки останова для адаптивного дизайна */
    breakpoints?: EDevice | EDevice[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;
}
