// Types
import type { ISpecsProps, TSpecValue } from '@/types/composables/specs-types';
import type { EPotColor, EPotSize, EPotRadius, EPotDevice } from '@/enums/preset';

/**
 * Интерфейс пропсов для компонента PotCheckList
 */
export interface IPotCheckListProps<
    S extends object | TSpecValue,
    L extends (S extends object ? keyof S : string),
    V extends (S extends object ? keyof S : string),
    T extends (V extends keyof S ? S[V] : S) 
> extends ISpecsProps<S, L, V, T> { 
    /** Список выбранных значений */
    value?: T[];

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: T[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то в начале списка появится чекбокс для выбора и сброса всех значений сразу */
    resetable?: boolean;

    /** Цвет чекбоксов в списке */
    color?: EPotColor | EPotColor[] | null; 

    /** Размер чекбокса, null для скейла от шрифта */
    size?: EPotSize | EPotSize[] | null;

    /** Радиус границ чекбокса */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Иконка в чекбоксе, галочка по-умолчанию */
    icon?: string;
}