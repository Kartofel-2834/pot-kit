// Types
import type { ComputedRef, ShallowReactive } from 'vue';
import type { Schema as ZodSchema } from 'zod';
import type { Schema as YupSchema } from 'yup';

export type TFormError = {
    type: string | null;
    message: string;
}

export type TFormFullErrorsList<T extends object> = {
    [field in keyof T]?: TFormError[];
};

export type TFormErrorsList<T extends object> = {
    [field in keyof T]?: TFormError;
};

export type TFormValidator<T extends object, U extends keyof T> = (
    value: T[U],
    form: T,
    errors: TFormErrorsList<T>
) => TFormError | TFormError[] | null;

export type TFormValidatorsList<T extends object> = {
    [field in keyof T]?: TFormValidator<T, field>[] | ZodSchema<T[field]> | YupSchema<T[field]>;
}

export type TFormPreparedValidatorsList<T extends object> = {
    [field in keyof T]?: TFormValidator<T, field>[];
}

export type TForm<T extends object> = {
    /** Значения полей формы */
    values: ShallowReactive<T>;

    /** Сообщения ошибок валидации */
    errors: ShallowReactive<TFormErrorsList<T>>;

    /** Ошибки валидации */
    fullErrors: ShallowReactive<TFormFullErrorsList<T>>;

    /** Флаг указывающий на валидность фомы */
    valid: ComputedRef<boolean>;

    /** Валидировать всю форму */
    validate: () => boolean;

    /** Валидировать поле формы */
    validateField: (field: keyof T) => TFormError | null;

    /**
     * Изменить значение поля формы.
     * Валидирует поле, если форма в strict-mode или у поля есть ошибка
    */
    change: <U extends keyof T>(field: U, newValue: T[U]) => T[U];

    /** Валидирует поле, если форма в strict-mode или у поля есть ошибка */
    toggle: (field: keyof T) => TFormError | null;
    
    /** Изменить несколько полей формы с последующей валидацией */
    update: (payload: Partial<T>) => T;
    
    /** Очистить поля формы и ошибки валидации */
    reset: () => T;
};