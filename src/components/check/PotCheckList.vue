<template>
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
</template>

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
import type { TSpecValue } from '@/types/composables';
import type { IPotCheckListProps } from '@/types/components';

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useSpecs } from '@/composables/specs';

// Components
const PotCheckBox = defineAsyncComponent(() => import('@/components/check/PotCheckbox.vue'));

const $props = withDefaults(defineProps<IPotCheckListProps<S, L, V, T>>(), {
    tag: 'div',
    specs: () => [],
    facets: null,
    resetLabel: 'Все',
    disabled: false,
    resetable: false,
    color: null,
    size: null,
    radius: null,
});

const $emit = defineEmits<{
    change: [value: T[]];
    'update:modelValue': [value: T[]];
}>();

// Computed
const specsHelper = computed(() => useSpecs($props));
const updatedSpecs = computed(() => specsHelper.value.getModifiedSpecs());

const currentValue = computed<T[]>(() => $props.value || $props.modelValue || []);
const isAllSelected = computed(() => {
    if (!$props.resetable) return false;

    return currentValue.value.length === updatedSpecs.value.length;
});

// Methods
function onCheckboxChange(specValue: T | null): void {
    if (specValue === null) {
        let specValue = isAllSelected.value
            ? []
            : updatedSpecs.value.filter(spec => !spec.isDisabled).map(spec => spec.value);

        specValue = specValue.filter(value => value !== null);

        $emit('change', specValue as T[]);
        $emit('update:modelValue', specValue as T[]);
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
