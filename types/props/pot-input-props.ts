
/**
 * Пропсы для компонента PotInputBase
 */
export interface IPotInputBaseProps<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
> {
    /** Текущее значение */
    value?: unknown;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: unknown;

    /** Преобразование переданного значения в отображаемую в инпуте строку */
    formatter?: (value: unknown) => string;

    /** Преобразование значения инпута перед эмитом событий изменения */
    parser?: (value: string) => unknown;

    /** Точки останова для адаптивного дизайна */
    devices?: TDevice[];

    /** Радиус границ кнопки */
    radius?: TRadius | TRadius[] | null;

    /** Размер инпута */
    size?: TSize | TSize[] | null;

    /** Цвет инпута */
    color?: TColor | TColor[] | null;

    /** Правая иконка */
    icon?: string;

    /** Левая иконка */
    preicon?: string;

    /** Если true, то инпут будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то инпут будет невалиден */
    invalid?: boolean;
}
