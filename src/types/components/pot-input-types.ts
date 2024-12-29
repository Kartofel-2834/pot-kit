/**
 * Пропсы для компонента PotInput
 */
export interface IPotInputProps {
    /** Текущее значение */
    value?: string;

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: string;

    /** Правая иконка */
    icon?: string;

    /** Левая иконка */
    preicon?: string;
}
