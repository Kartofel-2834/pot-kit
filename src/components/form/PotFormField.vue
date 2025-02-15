<template>
    <component
        :is="tag"
        class="pot-form-field"
    >
        <slot
            :error="error"
            :errors-list="errorsList"
            :valid="!error"
            :invalid="Boolean(error)"
            :change="change"
            :toggle="toggle"
            :validate="validate"
        />

        <div
            v-if="error"
            :class="[$style.error, 'pot-form-field__error']"
        >
            {{ error?.message }}
        </div>
    </component>
</template>

<script lang="ts" generic="T extends object, U extends keyof T" setup>
// Types
import type {
    IPotFormFieldProps,
    IPotFormFieldSlots,
} from '@/types/components/pot-form-field-types';
import type { TFormError, TFormErrorsList, TFormFullErrorsList } from '@/types/composables';

// Vue
import { computed } from 'vue';

const $props = withDefaults(defineProps<IPotFormFieldProps<T, U>>(), {
    tag: 'div',
});

defineSlots<IPotFormFieldSlots<T, U>>();

// Computed
const error = computed<TFormError | null>(() => {
    const currentErrors = $props.form.errors as TFormErrorsList<T>;

    return currentErrors[$props.field] ?? null;
});

const errorsList = computed<TFormError[]>(() => {
    const currentErrors = $props.form.fullErrors as TFormFullErrorsList<T>;

    return currentErrors[$props.field] ?? [];
});

// Methods
function change(value: T[U]): T[U] {
    return $props.form.change($props.field, value);
}

function toggle(): TFormError | null {
    return $props.form.toggle($props.field);
}

function validate() {
    return $props.form.validateField($props.field);
}
</script>

<style lang="scss" module>
.error {
    padding-top: 0.4em;
    color: var(--pot-color-invalid);
    font-size: inherit;
    pointer-events: none;
    user-select: none;
}
</style>
