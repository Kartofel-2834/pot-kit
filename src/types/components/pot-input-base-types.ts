// Types
import type { EPotColor, EPotRadius, EPotDevice, EPotSize } from "@/enums/preset";

/**
 * Пропсы для компонента PotInputBase
 */
export interface IPotInputBaseProps<T = string> {
    /** Текущее значение */
    value?: T;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: T;

    /** Преобразование переданного значения в отображаемую в инпуте строку */
    formatter?: (value: T) => string;

    /** Преобразование значения инпута перед эмитом событий изменения */
    parser?: (value: string) => T;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];

    /** Радиус границ кнопки */
    radius?: EPotRadius | EPotRadius[] | null;

    /** Размер инпута */
    size?: EPotSize | EPotSize[] | null;

    /** Цвет инпута */
    color?: EPotColor | EPotColor[] | null;

    /** Правая иконка */
    icon?: string;

    /** Левая иконка */
    preicon?: string;

    /** Если true, то инпут будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то инпут будет невалиден */
    invalid?: boolean;
}
