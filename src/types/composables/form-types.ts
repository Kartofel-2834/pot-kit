// Types
import type { ComputedRef, DeepReadonly, ShallowReactive } from 'vue';

export type TFormErrors<T extends object> = {
    [field in keyof T]?: string;
};

export type TFormValidator<T extends object, U extends keyof T> = (
    value: T[U],
    form: T,
    errors: TFormErrors<T>
) => string | null;

export type TFormValidatorsList<T extends object> = {
    [field in keyof T]?: TFormValidator<T, field>[];
}

export type TForm<T extends object> = {
    /** Значения полей формы */
    values: ShallowReactive<T>;

    /** Ошибки валидации */
    errors: DeepReadonly<ShallowReactive<TFormErrors<T>>>;

    /** Флаг указывающий на валидность фомы */
    isValid: ComputedRef<boolean>;

    /** Валидировать всю форму */
    validate: () => boolean;

    /** Валидировать поле формы */
    validateField: (field: keyof T) => string | null;

    /** Изменить значение поля формы с последующей валидацией */
    change: (field: keyof T, newValue: T[typeof field]) => T[typeof field];
    
    /** Изменить несколько полей формы с последующей валидацией */
    update: (payload: Partial<T>) => T;
    
    /** Очистить поля формы и ошибки валидации */
    reset: () => T;
};