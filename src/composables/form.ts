// Types
import type {
    TForm,
    TFormErrorsList,
    TFormFullErrorsList,
    TFormPreparedValidatorsList,
    TFormValidator,
    TFormValidatorsList,
    TFormError
} from "@/types/composables";

// Vue
import { computed, shallowReactive } from "vue";

// Libraries
import { Schema as ZodSchema } from "zod";
import { Schema as YupSchema, ValidationError as YupValidationError } from 'yup';

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
): TForm<T> {
    const preparedValidators = Object.keys(validators).reduce((res, key) => {
        const field = key as keyof T;
        const validator = validators[field];

        if (validator instanceof ZodSchema) {
            return { ...res, [field]: mapZodValidator(validator) };
        }
        
        if (validator instanceof YupSchema) {
            return { ...res, [field]: mapYupValidator(validator) };
        }

        return { ...res, [field]: validator };
    }, {} as TFormPreparedValidatorsList<T>);
    
    const form = shallowReactive<T>({ ...defaultValues });
    const fullErrors = shallowReactive<TFormFullErrorsList<T>>({});
    const errors = shallowReactive<TFormErrorsList<T>>({});

    const valid = computed<boolean>(() => !Object.values(errors).some(Boolean));

    function validateField(field: keyof T): TFormError | null {
        const validatorsList = preparedValidators[field] || [];
        const value = form[field];
        
        const currentErrors = validatorsList
            .map(validator => validator(value, form, errors))
            .flat()
            .filter(Boolean);

        if (!currentErrors.length) {
            delete fullErrors[field];
            delete errors[field];
            return null;
        }

        const firstError = currentErrors[0];

        if (firstError?.message) {
            // @ts-ignore
            errors[field] = { ...firstError };
        }
        
        // @ts-ignore
        fullErrors[field] = currentErrors as TFormError[];

        return firstError;
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
        toggle(field);
        return newValue;
    }

    function toggle(field: keyof T): TFormError | null {
        if (strict || errors[field]) {
            return validateField(field);
        }

        return null;
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
            delete fullErrors[field];
        }

        return defaultValues;
    }

    return {
        values: form,
        errors,
        fullErrors,
        valid,
        toggle,
        change,
        update,
        reset,
        validate,
        validateField,
    };
}

function mapYupValidator<T extends object, U extends keyof T>(
    yupValidator: YupSchema<T[U]>
): TFormValidator<T, U>[] {
    const validator = (value: T[U]) => {
        try {
            yupValidator.validateSync(value, {
                abortEarly: false
            });

            return null;
        } catch (err) {
            const validationError = err as YupValidationError;

            return validationError.inner.map(innerError => ({
                message: innerError.message,
                type: innerError.type ?? null
            }));
        }
    };

    return [validator];
}

function mapZodValidator<T extends object, U extends keyof T>(
    zodValidator: ZodSchema<T[U]>
): TFormValidator<T, U>[] {
    const validator = (value: T[U]) => {
        const result = zodValidator.safeParse(value);

        if (result.success) {
            return null;
        }

        return result.error.issues.map(issue => ({
            message: issue.message,
            type: issue.code
        }));
    };

    return [validator];
}