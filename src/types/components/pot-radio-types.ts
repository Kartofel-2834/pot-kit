// Types
import type { ISpecsProps, TSpec, TSpecValue } from '@/types/composables/specs-helper-types';

// Enums
import { EDevice, EColorTheme, ESize } from '@/enums/config';
import { ERadius } from '@/enums/components';

/**
 * Интерфейс пропсов для компонента PotRadio
 */
export interface IPotRadioProps<
    T extends TSpecValue,
    U extends TSpec = TSpecValue
> extends ISpecsProps<T, U> {
    /** HTML-тег радио-листа. По умолчанию - 'ul' */
    tag?: string;

    /** HTML-тег элемента радио-листа. По умолчанию - 'li' */
    radioTag?: string;

    /** Цвет элементов списка */
    color?: EColorTheme | EColorTheme[];

    /** Цвет элементов списка */
    size?: ESize | ESize[] | null;

    /** Скругление маркеров элементов списка */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то список будет невалиден */
    invalid?: boolean;
}
