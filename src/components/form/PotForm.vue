<template>
    <component
        :is="tag"
        class="pot-form"
    >
        <slot v-bind="formHelper" />
    </component>
</template>

<script lang="ts" generic="T extends object" setup>
// Types
import type { IPotFormProps } from '@/types/components/pot-form-types';
import type { TForm, TFormFullErrorsList } from '@/types/composables';

// Vue
import { shallowRef, watch } from 'vue';

// Composables
import { useForm } from '@/composables/form';

const $props = withDefaults(defineProps<IPotFormProps<T>>(), {
    tag: 'div',
    validators: () => ({}),
    strict: false,
});

const $emit = defineEmits<{
    change: [updatedForm: T];
    validate: [fullErrors: TFormFullErrorsList<T>];
}>();

const formHelper = shallowRef<TForm<T>>(
    useForm($props.defaultValues, $props.validators, $props.strict),
);

watch(
    () => [$props.validators, $props.strict],
    () => (formHelper.value = useForm($props.defaultValues, $props.validators, $props.strict)),
    { immediate: true },
);

watch(
    () => formHelper.value?.fullErrors,
    newErrors => $emit('validate', { ...newErrors } as TFormFullErrorsList<T>),
    { deep: true },
);

watch(
    () => formHelper.value?.values,
    newForm => $emit('change', { ...newForm } as T),
    { deep: true },
);
</script>
