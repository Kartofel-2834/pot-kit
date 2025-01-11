<template>
    <PotInputBase
        :class="[$style.PotInputMasked, 'pot-input-masked']"
        :model-value="modelValue"
        :value="value"
        :devices="devices"
        :size="size"
        :color="color"
        :icon="icon"
        :preicon="preicon"
        :disabled="disabled"
        :parser="parser"
        :formatter="formatter"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template
            v-if="$slots.preicon"
            #preicon
        >
            <slot name="preicon" />
        </template>

        <template
            v-if="$slots.icon"
            #icon
        >
            <slot name="icon" />
        </template>

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
import type { IPotInputMaskedProps } from '@/types/components';

// Composables
import { useMask, removeMask } from '@/composables/mask';

// Components
import PotInputBase from '@/components/input/PotInputBase.vue';

const $props = defineProps<IPotInputMaskedProps>();

const $emit = defineEmits<{
    input: [value: unknown];
    change: [value: unknown];
    'update:modelValue': [value: unknown];
}>();

// Methods
function formatter(value: unknown): string {
    const striginfiedValue =
        typeof value === 'string' || typeof value === 'number' ? String(value) : '';

    if (!$props.mask) {
        return striginfiedValue;
    }

    return useMask(striginfiedValue, $props.mask);
}

function parser(value: string): string {
    if (!$props.mask) {
        return value;
    }
    return removeMask(value, $props.mask);
}
</script>

<style lang="scss" module>
.PotInputMasked {
    //
}
</style>
