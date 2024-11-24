// Types
import type { Ref, ComputedRef, DeepReadonly } from 'vue';
import type { Validator } from '@/types/composables/validators-types';

export type FormValidators<T> = Partial<Record<keyof T, Validator<T>[]>>;

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type FormHelper<T> = {
    /** Значения полей формы */
    values: DeepReadonly<Ref<Partial<T>>>;

    /** Ошибки валидации */
    errors: DeepReadonly<Ref<FormErrors<T>>>;

    /** Флаг указывающий на валидность фомы */
    isValid: ComputedRef<boolean>;

    validate: (show?: boolean) => FormErrors<T>;
    validateField: (field: keyof T) => string;
    change: (payload: Partial<T>, isShowErrors?: boolean) => FormErrors<T>;
    update: (payload: Partial<T>, isShowErrors?: boolean) => FormErrors<T>;
    changeField: (field: keyof T, newValue: T[keyof T]) => string;
};