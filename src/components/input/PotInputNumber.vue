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
        :invalid="invalid"
        :parser="parser"
        :formatter="formatter"
        :min="min"
        :max="max"
        class="pot-input-number"
        type="number"
        @input="$emit('input', $event as number)"
        @change="$emit('change', $event as number)"
        @update:model-value="$emit('update:modelValue', $event as number)"
        @keydown="onKeydown"
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

        <template #append>
            <slot name="append" />
        </template>

        <template #prepend>
            <slot name="prepend" />
        </template>
    </PotInputBase>
</template>

<script setup lang="ts">
// Types
import type { IPotInputNumberProps } from '@/types/components';

// Vue
import { computed } from 'vue';

// Components
import PotInputBase from '@/components/input/PotInputBase.vue';

const hightLimit = Math.pow(10, 20);
const lowLimit = hightLimit * -1;

const $props = withDefaults(defineProps<IPotInputNumberProps>(), {
    min: null,
    max: null,
    precision: 2,
});

const $emit = defineEmits<{
    input: [value: number | null];
    change: [value: number | null];
    'update:modelValue': [value: number | null];
}>();

// Computed
const currentValue = computed<unknown>(() => $props.value ?? $props.modelValue);

// Methods
function onKeydown(event: KeyboardEvent) {
    if (event.key === '-' && typeof currentValue.value === 'number' && !isNaN(currentValue.value)) {
        changeValue(parser(String(currentValue.value * -1)));
    }

    const isLetterPressed = !event.ctrlKey && /^[a-zA-Z]$/.test(event.key);

    if (['-', ','].includes(event.key) || isLetterPressed) {
        event.preventDefault();
    }

    const precision = String(currentValue.value || '')
        .replace(/,/gm, '.')
        .split('.')[1];

    if (/^[0-9]$/.test(event.key) && precision.length === $props.precision) {
        event.preventDefault();
    }
}

function changeValue(newValue: number | null) {
    $emit('input', newValue);
    $emit('update:modelValue', newValue);
    $emit('change', newValue);
}

function parser(value: string): number | null {
    let [target, precision] = value.replace(/,/gm, '.').split('.');

    const isNegative = target.startsWith('-');

    precision = typeof precision === 'string' ? precision.replace(/[^0-9]/gm, '') : '';
    precision = precision.slice(0, $props.precision ?? 2);

    let updatedValue = Number(target.replace(/[^0-9]/gm, '')) * (isNegative ? -1 : 1);
    let updatedPrecision = Number(precision) || 0;

    if (value.endsWith('-')) {
        updatedValue = updatedValue * -1;
    }

    updatedValue =
        typeof $props.max === 'number' && !isNaN($props.max)
            ? Math.min(updatedValue, $props.max, hightLimit)
            : Math.min(updatedValue, hightLimit);

    updatedValue =
        typeof $props.min === 'number' && !isNaN($props.min)
            ? Math.max(updatedValue, $props.min, lowLimit)
            : Math.max(updatedValue, lowLimit);

    if ([null, undefined, ''].includes(value) || isNaN(updatedValue)) {
        return null;
    }

    return Number(`${updatedValue}.${updatedPrecision}`);
}

function formatter(value: unknown): string {
    if (value === null || value === undefined || typeof value !== 'number' || isNaN(value)) {
        return '';
    }

    return String(value);
}
</script>
