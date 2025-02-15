// Enums
import { ERadius } from "@/enums/components";
import { EColorTheme, EDevice, ESize } from "@/enums/config";

/**
 * Пропсы для компонента PotInputNumber
 */
export interface IPotInputNumberProps {
    /** Текущее значение */
    value?: number | null;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: number | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];

    /** Радиус границ кнопки */
    radius?: ERadius | ERadius[] | null;

    /** Размер инпута */
    size?: ESize | ESize[];

    /** Цвет инпута */
    color?: EColorTheme | EColorTheme[] | null;

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