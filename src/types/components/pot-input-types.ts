/**
 * Пропсы для компонента PotInput
 */
export interface IPotInputProps {
    /** Текущее значение */
    value?: string;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: string;

    /** Точки останова для адаптивного дизайна */
    breakpoints?: string | string[];

    /** Радиус границ кнопки */
    radius?: string | string[];

    /** Размер инпута */
    size?: string | string[];

    /** Цвет инпута */
    color?: string | string[];

    /** Правая иконка */
    icon?: string;

    /** Левая иконка */
    preicon?: string;
}
