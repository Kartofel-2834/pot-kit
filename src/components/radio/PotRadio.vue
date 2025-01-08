<template>
    <component
        :is="tag"
        :class="[$style.PotRadio, 'pot-radio']"
    >
        <slot
            v-for="spec of updatedSpecs"
            name="radio"
            :spec="spec.target"
            :disabled="disabled || spec.isDisabled"
            :active="spec.isSelected"
            :on-change="() => onSpecClick(spec.value, spec.isDisabled)"
        >
            <PotRadioElement
                :key="`PotRadioElement_${spec.value}`"
                :tag="radioTag"
                :color="color"
                :disabled="disabled || spec.isDisabled"
                :active="spec.isSelected"
                @click="onSpecClick(spec.value, spec.isDisabled)"
            >
                {{ spec.label }}
            </PotRadioElement>
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioProps } from '@/types/components';
import type { SpecValue } from '@/types/composables/specs-helper-types';

// Enums
import { EColorTheme } from '@/enums/config';

// Vue
import { computed, defineAsyncComponent } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';
import { ERadius } from '@/enums/components';

// Components
const PotRadioElement = defineAsyncComponent(
    () => import('@/components/radio/PotRadioElement.vue'),
);

const $props = withDefaults(defineProps<IPotRadioProps>(), {
    tag: 'ul',
    radioTag: 'li',
    value: null,
    modelValue: null,
    specs: () => [],
    facets: null,
    color: EColorTheme.PRIMARY,
    radius: ERadius.CIRCLE,
    disabled: false,
});

const $emit = defineEmits<{
    change: [value: SpecValue];
    'update:modelValue': [value: SpecValue];
}>();

// Computed
const specsHelper = computed(() => useSpecsHelper($props));

const updatedSpecs = computed(() => specsHelper.value.getModifiedSpecs());

// Methods
function onSpecClick(specValue: SpecValue, isDisabled: boolean): void {
    if ($props.disabled || isDisabled) return;

    $emit('change', specValue);
    $emit('update:modelValue', specValue);
}
</script>

<style lang="scss" module>
.PotRadio {
    display: flex;
    gap: var(--spacer-2);
}
</style>
