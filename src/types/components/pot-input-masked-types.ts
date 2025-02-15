// Types
import type { TMaskPlaceholder } from "@/types/composables";

// Enums
import { ERadius } from "@/enums/components";
import { EColorTheme, EDevice, ESize } from "@/enums/config";

/**
 * Пропсы для компонента PotInputMasked
 */
export interface IPotInputMaskedProps<T = string> {
    /** Текущее значение */
    value?: T;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: T;

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

    /** Маска для видимого значения инпута */
    mask: string;

    /** Конфигурация символов подстановки для маски */
    maskPlaceholders?: Record<string, TMaskPlaceholder>;
}