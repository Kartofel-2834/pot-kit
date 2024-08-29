<template>
    <component
        :is="tag"
        :class="[$style.PotRadio, 'pot-radio']"
    >
        <template v-for="{ target: spec, value, label, isDisabled, isSelected } of updatedSpecs">
            <slot
                name="radio"
                :spec="spec"
                :disabled="disabled || isDisabled"
                :active="isSelected"
                :on-change="() => onSpecClick(spec)"
            >
                <PotRadioElement
                    :key="`PotRadioElement_${value}`"
                    :tag="radioTag"
                    :color="color"
                    :disabled="disabled || isDisabled"
                    :active="isSelected"
                    @click="onSpecClick(spec)"
                >
                    {{ label }}
                </PotRadioElement>
            </slot>
        </template>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioProps } from '@/types/components/pot-radio-types';
import type { Spec, SpecValue } from '@/types/composables/specs-helper-types';

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
    value: null,
    modelValue: null,
    valueName: 'value',
    labelName: 'label',
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
function onSpecClick(spec: Spec): void {
    if (specsHelper.value.checkIsDisabled(spec)) return;

    const newValue: SpecValue = specsHelper.value.getSpecValue(spec);

    $emit('change', newValue);
    $emit('update:modelValue', newValue);
}
</script>

<style lang="scss" module>
.PotRadio {
    display: flex;
    gap: 2rem;
}
</style>
