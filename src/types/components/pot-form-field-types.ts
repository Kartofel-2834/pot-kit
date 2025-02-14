// Types
import type { TForm, TFormError } from "../composables";

export interface IPotFormFieldProps<T extends object, U extends keyof T> {
    tag?: string;
    form: TForm<T>;
    field: U;
}

/* --- Slots --- */
export interface IPotFormFieldDefaultSlotArgs<T extends object, U extends keyof T> {
    /** Ошибка валидации поля (null, если ошибок нет) */
    error: TFormError | null;

    /** Список всех ошибок валидации поля */
    errorsList: TFormError[];

    /** Флаг указывающий на валидность поля */
    valid: boolean;

    /**
     * Изменить значение поля формы.
     * Валидирует поле, если форма в strict-mode или у поля есть ошибка
    */
    change: (value: T[U]) => T[U];

    /** Валидирует поле, если форма в strict-mode или у поля есть ошибка */
    toggle: () => TFormError | null;

    /** Валидировать поле формы */
    validate: () => TFormError | null;
}

export interface IPotFormFieldSlots<T extends object, U extends keyof T> {
    default: (args: IPotFormFieldDefaultSlotArgs<T, U>) => unknown;   
}
