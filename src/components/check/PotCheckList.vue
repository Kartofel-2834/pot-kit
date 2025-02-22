<template>
    <component
        :is="tag"
        class="pot-check-list"
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
                :radius="radius"
                @change="onCheckboxChange(spec.value)"
            >
                {{ spec.label }}
            </PotCheckBox>
        </slot>
    </component>
</template>

<script
    lang="ts"
    generic="S extends object, L extends keyof S, V extends keyof S, T extends S[V] & TSpecValue"
    setup
>
// Types
import type { TSpecValue } from '@/types/composables/specs-helper-types';
import type { IPotCheckListProps } from '@/types/components';

// Enums
import { POT_COLOR_THEME, POT_SIZE } from '@/enums/config';
import { POT_RADIUS } from '@/enums/components';

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';

// Components
const PotCheckBox = defineAsyncComponent(() => import('@/components/check/PotCheckbox.vue'));

const $props = withDefaults(defineProps<IPotCheckListProps<S, L, V, T>>(), {
    tag: 'div',
    specs: () => [],
    facets: null,
    resetLabel: 'Все',
    disabled: false,
    resetable: false,
    color: POT_COLOR_THEME.PRIMARY,
    size: POT_SIZE.MEDIUM,
    radius: POT_RADIUS.MEDIUM,
});

const $emit = defineEmits<{
    change: [value: T[]];
    'update:modelValue': [value: T[]];
}>();

// Computed
const specsHelper = computed(() => useSpecsHelper($props));
const updatedSpecs = computed(() => specsHelper.value.getModifiedSpecs());

const currentValue = computed<T[]>(() => $props.value || $props.modelValue || []);
const isAllSelected = computed(() => {
    if (!$props.resetable) return false;

    return currentValue.value.length === updatedSpecs.value.length;
});

// Methods
function onCheckboxChange(specValue: T | null): void {
    if (specValue === null) {
        const specValue = isAllSelected.value
            ? []
            : updatedSpecs.value.filter(spec => !spec.isDisabled).map(spec => spec.value);

        $emit('change', specValue);
        $emit('update:modelValue', specValue);
        return;
    }

    let updatedValue = [...currentValue.value];
    const index = updatedValue.indexOf(specValue);

    if (index >= 0) {
        updatedValue.splice(index, 1);
    } else {
        updatedValue.push(specValue);
    }

    $emit('change', updatedValue);
    $emit('update:modelValue', updatedValue);
}
</script>

<style lang="scss">
.pot-check-list {
    display: flex;
    gap: 2rem;
}
</style>
