// Types
import type { ISpecsProps, TSpecValue } from '@/types/composables/specs-helper-types';
import type { EPotDevice, EPotColorTheme, EPotSize } from '@/enums/config';
import type { EPotRadius } from '@/enums/components';

/**
 * Интерфейс пропсов для компонента PotRadio
 */
export interface IPotRadioProps<
    S extends object,
    L extends keyof S,
    V extends keyof S,
    T extends S[V] & TSpecValue
> extends ISpecsProps<S, L, V, T> {
    /** Выбранное значение */
    value?: T | null;

    /** Выбранное значение. Для поддержки v-model */
    modelValue?: T | null;

    /** HTML-тег радио-листа. По умолчанию - 'ul' */
    tag?: string;

    /** HTML-тег элемента радио-листа. По умолчанию - 'li' */
    radioTag?: string;

    /** Цвет элементов списка */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Цвет элементов списка */
    size?: EPotSize | EPotSize[] | null;

    /** Скругление маркеров элементов списка */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то список будет невалиден */
    invalid?: boolean;
}
