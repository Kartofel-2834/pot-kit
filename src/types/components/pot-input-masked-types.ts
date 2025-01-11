// Enums
import { ESize, ERadius } from "@/enums/components";
import { EColorTheme, EDevice, EIcon } from "@/enums/config";

/**
 * Пропсы для компонента PotInputMasked
 */
export interface IPotInputMaskedProps {
    /** Текущее значение */
    value?: unknown;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: unknown;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];

    /** Радиус границ кнопки */
    radius?: ERadius | ERadius[] | null;

    /** Размер инпута */
    size?: ESize | ESize[];

    /** Цвет инпута */
    color?: EColorTheme | EColorTheme[] | null;

    /** Правая иконка */
    icon?: EIcon | null;

    /** Левая иконка */
    preicon?: EIcon | null;

    /** Если true, то инпут будет заблокирован и не активен */
    disabled?: boolean;

    mask: string;
}