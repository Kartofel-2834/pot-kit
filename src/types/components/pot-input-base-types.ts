// Enums
import { ESize, ERadius } from "@/enums/components";
import { EColorTheme, EDevice, EIcon } from "@/enums/config";

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
}
