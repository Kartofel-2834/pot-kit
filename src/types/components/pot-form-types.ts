// Types
import type { TFormValidatorsList } from "../composables";

export interface IPotFormProps<T extends object> {
    /** HTML-тег формы */
    tag: string;

    /** Значения формы по-умолчанию */
    defaultValues: T;

    /** Валидаторы формы */
    validators?: TFormValidatorsList<T>;

    /** Валидация в строгом режиме */
    strict?: boolean;
}