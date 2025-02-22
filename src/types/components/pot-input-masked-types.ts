// Types
import type { TMaskPlaceholder } from "@/types/composables";
import type { EPotRadius } from "@/enums/components";
import type { EPotColorTheme, EPotDevice, EPotSize } from "@/enums/config";

/**
 * Пропсы для компонента PotInputMasked
 */
export interface IPotInputMaskedProps<T = string> {
    /** Текущее значение */
    value?: T;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: T;

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

    /** Маска для видимого значения инпута */
    mask: string;

    /** Конфигурация символов подстановки для маски */
    maskPlaceholders?: Record<string, TMaskPlaceholder>;
}