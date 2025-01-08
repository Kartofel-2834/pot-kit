// Enums
import { ESize, ERadius } from "@/enums/components";
import { EColorTheme, EDevice } from "@/enums/config";

/**
 * Пропсы для компонента PotInput
 */
export interface IPotInputBaseProps {
    /** Текущее значение */
    value?: unknown;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: unknown;

    /** Преобразование переданного значения в отображаемую в инпуте строку */
    formatter?: (value: unknown) => string;

    /** Преобразование значения инпута перед эмитом событий изменения */
    parser?: (value: string) => unknown;

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
}
