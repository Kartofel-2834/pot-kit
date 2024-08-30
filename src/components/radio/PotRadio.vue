<template>
    <component
        :is="tag"
        :class="[$style.PotRadio, 'pot-radio']"
    >
        <slot
            v-for="{ value: specValue, label, target, isDisabled, isSelected } of updatedSpecs"
            name="radio"
            :spec="target"
            :disabled="disabled || isDisabled"
            :active="isSelected"
            :on-change="() => onSpecClick(specValue, isDisabled)"
        >
            <PotRadioElement
                :key="`PotRadioElement_${specValue}`"
                :tag="radioTag"
                :color="color"
                :disabled="disabled || isDisabled"
                :active="isSelected"
                @click="onSpecClick(specValue, isDisabled)"
            >
                {{ label }}
            </PotRadioElement>
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioProps } from '@/types/components/pot-radio-types';
import type { SpecValue } from '@/types/composables/specs-helper-types';

// Vue
import { computed, defineAsyncComponent } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';

// Components
const PotRadioElement = defineAsyncComponent(
    () => import('@/components/radio/PotRadioElement.vue'),
);

const $props = withDefaults(defineProps<IPotRadioProps>(), {
    tag: 'ul',
    radioTag: 'li',
    specs: () => [],
    facets: null,
    color: 'clay',
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
    if (isDisabled) return;

    $emit('change', specValue);
    $emit('update:modelValue', specValue);
}
</script>

<style lang="scss" module>
.PotRadio {
    display: flex;
    gap: 2rem;
}
</style>
