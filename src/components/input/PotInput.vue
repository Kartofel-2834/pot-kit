<template>
    <input
        :value="currentValue"
        :class="[$style.PotInput, 'pot-input']"
        v-bind="$attrs"
        @input="onInput"
        @change="onChange"
    />
</template>

<script lang="ts" setup>
// Types
import type { IPotInputProps } from '@/types/components';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

const $props = withDefaults(defineProps<IPotInputProps>(), {
    size: '32',
    color: 'pot',
    radius: '',
});

const $emit = defineEmits<{
    input: [value: string];
    change: [value: string];
    'update:modelValue': [value: string];
}>();

// Computed
const currentValue = computed(() =>
    typeof $props.value === 'string' ? $props.value : $props.modelValue,
);

const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: {
            size: $props.size,
            color: $props.color,
            radius: $props.radius,
        },
    });
});

// Methods
function onInput(event: Event): void {
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    $emit('update:modelValue', target.value);
    $emit('input', target.value);
}

function onChange(event: Event): void {
    event.stopPropagation();
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
