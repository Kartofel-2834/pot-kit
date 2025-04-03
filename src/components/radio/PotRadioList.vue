<script
    lang="ts"
    generic="
        S extends object | TSpecValue,
        L extends S extends object ? keyof S : string,
        V extends S extends object ? keyof S : string,
        T extends V extends keyof S ? S[V] : S
    "
    setup
>
// Types
import type { IPotRadioListProps } from '@/types/components';
import type { TSpecValue } from '@/types/composables';

// Vue
import { computed } from 'vue';

// Composables
import { useSpecs } from '@/composables/specs';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Components
import PotRadio from '@/components/radio/PotRadio.vue';

const $props = withDefaults(defineProps<IPotRadioListProps<S, L, V, T>>(), {
    specs: () => [],
    facets: null,
    devices: () => ALL_DEVICES_REVERSED,
});

const $emit = defineEmits<{
    change: [value: T];
    'update:modelValue': [value: T];
}>();

// Computed
const $specs = computed(() => useSpecs($props));

const updatedSpecs = computed(() => $specs.value.getModifiedSpecs());

// Methods
function onSpecClick(specValue: T | null, isDisabled: boolean): void {
    if ($props.disabled || isDisabled) {
        return;
    }

    $emit('change', specValue as T);
    $emit('update:modelValue', specValue as T);
}
</script>

<template>
    <slot
        v-for="spec of updatedSpecs"
        name="radio"
        :spec="spec.target"
        :value="spec.value"
        :label="spec.label"
        :disabled="disabled || spec.isDisabled"
        :checked="spec.isSelected"
        :on-change="() => onSpecClick(spec.value, spec.isDisabled)"
    >
        <PotRadio
            :key="`PotRadio_${spec.value}`"
            :color="$props.color"
            :size="$props.size"
            :radius="$props.radius"
            :disabled="disabled || spec.isDisabled"
            :invalid="invalid"
            :checked="spec.isSelected"
            @click="onSpecClick(spec.value, spec.isDisabled)"
        >
            {{ spec.label }}
        </PotRadio>
    </slot>
</template>
