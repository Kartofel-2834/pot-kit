// Types
import type { Ref } from "vue";
import type { FormValidators, FormErrors } from "@/types/composables";

// Vue
import { ref, computed, readonly } from "vue";

export function useForm<T>(
    validators: FormValidators<T>,
    defaultValues: Partial<T>,
) {
    const values: Ref<Partial<T>> = ref({});
    const errors: Ref<FormErrors<T>> = ref({});

    values.value = { ...defaultValues };
    
    const isValid = computed<boolean>(() => !Object.values(errors.value).some(Boolean));

    function validateField(field: keyof T): string | null {
        const validatorsList = validators[field];

        if (!Array.isArray(validatorsList)) {
            return null;
        }

        let errorMessage: string | null = null;
        const value = values.value[field];

        for (const validator of validatorsList) {
            errorMessage = validator(value, values.value);

            if (errorMessage) {
                errors.value = { ...errors.value, [field]: errorMessage };
                break;
            }
        }

        return errorMessage;
    }

    function validate(): boolean {
        let isValid = true;

        for (const field in validators) {
            const errorMessage = validateField(field);
            isValid = isValid && !errorMessage;
        }

        return isValid;
    }

    function changeField(field: keyof T, newValue: T[keyof T]): string | null {
        values.value = { ...values.value, [field]: newValue };
        const error = validateField(field);

        return error;
    }

    function update(payload: Partial<T>): boolean {
        values.value = { ...values.value, ...payload };
        return validate();
    }

    function change(payload: Partial<T>): boolean {
        values.value = { ...payload };
        return validate();
    }

    validate();

    return {
        values: readonly(values),
        errors: readonly(errors),
        isValid,
        change,
        update,
        validate,
        validateField,
        changeField,
    };
}