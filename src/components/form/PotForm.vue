<template>
    <component :is="tag">
        <slot v-bind="{ ...formHelper }" />
    </component>
</template>

<script lang="ts" generic="T extends object" setup>
// Types
import type { DeepReadonly, ShallowReactive, UnwrapNestedRefs } from 'vue';
import type { IPotFormProps } from '@/types/components/pot-form-types';
import type { TForm, TFormFullErrorsList } from '@/types/composables';

// Vue
import { watch } from 'vue';

// Composables
import { useForm } from '@/composables/form';

const $props = withDefaults(defineProps<IPotFormProps<T>>(), {
    tag: 'div',
    validators: () => ({}),
    strict: false,
});

const $emit = defineEmits<{
    change: [updatedForm: T];
    validate: [fullErrors: DeepReadonly<UnwrapNestedRefs<ShallowReactive<TFormFullErrorsList<T>>>>];
}>();

let formHelper: TForm<T>;

watch(
    () => [$props.validators, $props.strict],
    () => (formHelper = useForm($props.defaultValues, $props.validators, $props.strict)),
    { immediate: true },
);

watch(
    () => formHelper.fullErrors,
    newErrors => $emit('validate', newErrors),
    { deep: true },
);

watch(
    () => formHelper.values,
    newForm => $emit('change', { ...newForm } as T),
    { deep: true },
);
</script>
