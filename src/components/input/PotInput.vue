<template>
    <input
        :value="currentValue"
        :class="[$style.PotInput, 'pot-input']"
        v-bind="$attrs"
        @input="onInput"
        @change="onChange"
        @keydown="$emit('keydown', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
    />
</template>

<script lang="ts" setup>
// Types
import type { IPotInputProps } from '@/types/components';

// Vue
import { computed, withDefaults } from 'vue';

const $props = withDefaults(defineProps<IPotInputProps>(), {});

const $emit = defineEmits<{
    input: [value: string];
    change: [value: string];
    keydown: [e: KeyboardEvent];
    focus: [e: FocusEvent];
    blur: [e: FocusEvent];
    'update:modelValue': [value: string];
}>();

// Computed
const currentValue = computed(() =>
    typeof $props.value === 'string' ? $props.value : $props.modelValue,
);

// Methods
function onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('test', target.value, currentValue.value);
    $emit('update:modelValue', target.value);
    $emit('input', target.value);
}

function onChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    $emit('change', target.value);
}
</script>

<style lang="scss" module>
.PotInput {
    padding: 1rem;
    border: 1px solid;

    /* --- Sizes --- */
    @include modificator(size, 32) {
        height: 3.2rem;
        padding: 0 1rem;
        font-size: 1.4rem;

        @include modificator(square) {
            padding: 0;
        }
    }
}
</style>
