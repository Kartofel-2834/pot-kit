// Types
import type { IPotInputBaseProps } from "./pot-input-base-types";

/**
 * Пропсы для компонента PotInput
 */
export interface IPotInputPasswordProps extends IPotInputBaseProps<string> {
    /** Иконка для показа/скрытия пароля */
    toggleIcon?: string;
}