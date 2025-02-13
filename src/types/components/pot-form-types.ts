// Types
import type { TFormValidatorsList } from "../composables";

export interface IPotFormProps<T extends object> {
    tag?: string;
    defaultValues: T;
    validators?: TFormValidatorsList<T>;
    strict?: boolean;
}