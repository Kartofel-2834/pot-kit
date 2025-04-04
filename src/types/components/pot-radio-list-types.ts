// Types
import type { ISpecsProps, TSpecValue } from '@/types/composables/specs-types';
import type { EPotDevice, EPotColor, EPotRadius, EPotSize } from '@/enums/preset';

/**
 * Интерфейс пропсов для компонента PotRadio
 */
export interface IPotRadioListProps<
    S extends object | TSpecValue,
    L extends (S extends object ? keyof S : string),
    V extends (S extends object ? keyof S : string),
    T extends (V extends keyof S ? S[V] : S) 
> extends ISpecsProps<S, L, V, T> {
    /** Выбранное значение */
    value?: T | null;

    /** Выбранное значение. Для поддержки v-model */
    modelValue?: T | null;

    /** Цвет элементов списка */
    color?: EPotColor | EPotColor[]; 

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
