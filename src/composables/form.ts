// Types
import type { TFormErrors, TFormValidator, TFormValidatorsList } from "@/types/composables";

// Vue
import { computed, readonly, shallowReactive } from "vue";

/**
 * Компосабл для удобной валидации форм
 *
 * @param defaultValues - значения полей формы по-умолчанию
 * @param validators - набор валидаторов полей
 * @param strict - флаг указывающий на то, что метод формы change должен всегда валидировать поля
 *
 * @example
 * const form = useForm({
 *     login: '',
 *     password: '',
 * }, {
 *     login: [FormValidators.REQUIRED('Обязательное поле')],
 *     password: [FormValidators.REQUIRED('Обязательное поле')],
 * })
 */
export function useForm<T extends object>(
    defaultValues: T,
    validators: TFormValidatorsList<T> = {},
    strict: boolean = false
) {
    const form = shallowReactive<T>(defaultValues);
    const errors = shallowReactive<TFormErrors<T>>({});

    const isValid = computed<boolean>(() => !Object.values(errors).some(Boolean));

    function validateField(field: keyof T): string | null {
        const validatorsList = validators[field] || [];
        const value = form[field];

        for (const validator of validatorsList) {
            const errorMessage = validator(value, form, errors);

            if (errorMessage) {
                errors[field] = errorMessage as any;
                return errorMessage;
            }
        }

        delete errors[field];
        return null;
    }

    function validate(): boolean {
        let isValid = true;

        for (const field in validators) {
            const errorMessage = validateField(field);
            isValid = isValid && !errorMessage;
        }

        return isValid;
    }
    
    function change<U extends keyof T>(field: U, newValue: T[U]): T[U] {
        form[field] = newValue;

        if (strict || errors[field]) {
            validateField(field);
        }

        return newValue;
    }

    function update(payload: Partial<T>): T {
        for (const field in payload) {
            change(field, payload[field] as T[typeof field]);
        }

        return form;
    }

    function reset(): T {
        for (const field in defaultValues) {
            form[field] = defaultValues[field];
            delete errors[field];
        }

        return defaultValues;
    }

    return {
        values: form,
        errors: readonly(errors),
        isValid,
        change,
        update,
        reset,
        validate,
        validateField,
    };
}

/**
 * Набор базовых валидаторов
*/
export const FormValidators = {
    REQUIRED<T extends object, U extends keyof T>(
        message: string
    ): TFormValidator<T, U> {
        return value => value ? null : message;
    },

    DATE_VALID<T extends object, U extends keyof T>(
        message: string
    ): TFormValidator<T, U> {
        return v =>  {
            const isValid = (
                typeof v === 'object' &&
                v instanceof Date &&
                !isNaN(v?.getTime?.())
            );

            return isValid ? null : message;
        };
    },

    DATE_RANGE<T extends object, U extends keyof T> (
        fields: [keyof T, keyof T],
        message: string,
    ): TFormValidator<T, U> {
        return (_, form) => {
            const from = form?.[fields?.[0]];
            const to = form?.[fields?.[1]];

            if (!from || !to || !(from instanceof Date) || !(to instanceof Date)) {
                return null;
            }

            return from.getTime() < to.getTime() ? null : message;
        };        
    }
};