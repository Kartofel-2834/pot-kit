<template>
    <component
        :is="tag"
        :class="[$style.PotCheckList, 'pot-check-list']"
    >
        <!-- Чекбокс для выбора всех значений сразу -->
        <slot
            name="checkbox"
            :spec="null"
            :disabled="disabled"
            :selected="isAllSelected"
            :value="null"
            :label="resetLabel"
            :on-change="() => onCheckboxChange(null)"
        >
            <PotCheckBox
                v-if="resetable"
                :key="`PotCheckListCheckbox_reset`"
                :value="isAllSelected"
                :disabled="disabled"
                :color="color"
                :size="size"
                @change="onCheckboxChange(null)"
            >
                {{ resetLabel }}
            </PotCheckBox>
        </slot>

        <slot
            v-for="spec of updatedSpecs"
            name="checkbox"
            :spec="spec.target"
            :disabled="disabled || spec.isDisabled"
            :selected="spec.isSelected"
            :value="spec.value"
            :label="spec.label"
            :on-change="() => onCheckboxChange(spec.value)"
        >
            <PotCheckBox
                :key="`PotCheckListCheckbox_${spec.value}`"
                :value="spec.isSelected"
                :disabled="disabled || spec.isDisabled"
                :color="color"
                :size="size"
                @change="onCheckboxChange(spec.value)"
            >
                {{ spec.label }}
            </PotCheckBox>
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { SpecValue } from '@/types/composables/specs-helper-types';
import type { IPotCheckListProps } from '@/types/components';

// Enums
import { EColorTheme } from '@/enums/config';
import { ESize } from '@/enums/components';

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';

// Components
const PotCheckBox = defineAsyncComponent(() => import('@/components/check/PotCheckbox.vue'));

const $props = withDefaults(defineProps<IPotCheckListProps>(), {
    tag: 'div',
    specs: () => [],
    facets: null,
    resetLabel: 'Все',
    disabled: false,
    resetable: false,
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
});

const $emit = defineEmits<{
    change: [value: SpecValue[]];
    'update:modelValue': [value: SpecValue[]];
}>();

// Computed
const specsHelper = computed(() => useSpecsHelper($props));
const updatedSpecs = computed(() => specsHelper.value.getModifiedSpecs());

const currentValue = computed<SpecValue[]>(() => $props.value || $props.modelValue || []);
const isAllSelected = computed(() => {
    if (!$props.resetable) return false;

    return currentValue.value.length === updatedSpecs.value.length;
});

// Methods
function onCheckboxChange(specValue: SpecValue): void {
    let updatedValue = [...currentValue.value];
    const index = updatedValue.indexOf(specValue);

    if (specValue === null && isAllSelected.value) {
        updatedValue = [];
    } else if (specValue === null) {
        const availableSpecs = updatedSpecs.value.filter(
            spec => !specsHelper.value.checkIsDisabled(spec),
        );

        updatedValue = availableSpecs.map(specsHelper.value.getSpecValue);
    } else if (index >= 0) {
        updatedValue.splice(index, 1);
    } else {
        updatedValue.push(specValue);
    }

    $emit('change', updatedValue);
    $emit('update:modelValue', updatedValue);
}
</script>

<style lang="scss" module>
.PotCheckList {
    display: flex;
    gap: 2rem;
}
</style>
