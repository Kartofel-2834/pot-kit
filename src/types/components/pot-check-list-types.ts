// Types
import type { ISpecsProps, TSpecValue } from '@/types/composables/specs-helper-types';
import type { EPotColorTheme, EPotSize } from '@/enums/preset';
import type { EPotRadius } from '@/enums/components';

/**
 * Интерфейс пропсов для компонента PotCheckList
 */
export interface IPotCheckListProps<
    S extends object,
    L extends keyof S,
    V extends keyof S,
    T extends S[V] & TSpecValue
> extends ISpecsProps<S, L, V, T> {
    /** HTML-тег чек-листа. По умолчанию - 'div' */
    tag?: string;

    /** Список выбранных значений */
    value?: T[];

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: T[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то в начале списка появится чекбокс для выбора и сброса всех значений сразу */
    resetable?: boolean;

    /** Цвет чекбоксов в списке */
    color?: EPotColorTheme | EPotColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: EPotSize | EPotSize[] | null;

    /** Радиус границ чекбокса */
    radius?: EPotRadius | EPotRadius[] | null;
}