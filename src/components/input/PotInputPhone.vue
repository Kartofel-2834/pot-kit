<template>
    <PotInputBase
        :model-value="modelValue"
        :value="value"
        :devices="devices"
        :size="size"
        :color="color"
        :icon="icon"
        :preicon="preicon"
        :disabled="disabled"
        :parser="phoneNumberParser"
        :formatter="phoneNumberFormatter"
        type="phone"
        @input="onInput"
        @change="$emit('change', $event)"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template #prepend>
            <slot name="prepend" />
        </template>

        <template #append>
            <slot name="append" />
        </template>
    </PotInputBase>
</template>

<script setup lang="ts">
// Types
import type { IPotInputPhoneProps } from '@/types/components';

// Composables
import { useMask } from '@/composables/mask';

// Components
import PotInputBase from '@/components/input/PotInputBase.vue';

const $props = withDefaults(defineProps<IPotInputPhoneProps>(), {
    preicon: 'phone',
});

const $emit = defineEmits<{
    input: [value: unknown];
    change: [value: unknown];
    'update:modelValue': [value: unknown];
}>();

// Methods
function onInput(newValue: unknown) {
    console.log('phone', useMask(String(newValue), '+7 (###) ### ##-##'));
    $emit('input', newValue);
}

function phoneNumberFormatter(value: unknown): string {
    const data = String(value).replace('+7', '');
    return useMask(data, '+7 (###) ### ##-##');
}

function phoneNumberParser(value: unknown) {
    const data = String(value).replace('+7', '');
    return useMask(data, '+7##########');
}
</script>
