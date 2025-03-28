// Enums
import type { EPotRadius } from "@/enums/components";
import type { EPotColorTheme, EPotDevice, EPotSize } from "@/enums/preset";

/**
 * Пропсы для компонента PotInputNumber
 */
export interface IPotInputNumberProps {
    /** Текущее значение */
    value?: number | null;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: number | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Радиус границ кнопки */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Размер инпута */
    size?: EPotSize | EPotSize[];

    /** Цвет инпута */
    color?: EPotColorTheme | EPotColorTheme[] | null;

    /** Правая иконка */
    icon?: string;

    /** Левая иконка */
    preicon?: string;

    /** Если true, то инпут будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то инпут будет невалиден */
    invalid?: boolean;

    /** Длина дробной части  */
    precision?: number;

    /** Минимальное значение */
    min?: number | null;

    /** Максимальное значение */
    max?: number | null;
}