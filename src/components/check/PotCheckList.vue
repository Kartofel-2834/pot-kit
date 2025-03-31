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
import { computed } from 'vue';

// Composables
import { useSpecs } from '@/composables/specs';

// Components
import PotCheckbox from '@/components/check/PotCheckbox.vue';

const $props = withDefaults(defineProps<IPotCheckListProps<S, L, V, T>>(), {
    specs: () => [],
    facets: null,
    resetLabel: 'Все',
    disabled: false,
    resetable: false,
});

const $emit = defineEmits<{
    change: [value: T[]];
    'update:modelValue': [value: T[]];
}>();

// Computed
const $specs = computed(() => useSpecs($props));

const updatedSpecs = computed(() => $specs.value.getModifiedSpecs());

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

<template>
    <!-- Чекбокс для выбора всех значений сразу -->
    <slot
        name="checkbox"
        :spec="null"
        :disabled="$props.disabled"
        :selected="isAllSelected"
        :value="null"
        :label="$props.resetLabel"
        :on-change="() => onCheckboxChange(null)"
    >
        <PotCheckbox
            v-if="$props.resetable"
            :key="`PotCheckListCheckbox_reset`"
            :value="isAllSelected"
            :disabled="$props.disabled"
            :color="$props.color"
            :size="$props.size"
            @change="onCheckboxChange(null)"
        >
            {{ $props.resetLabel }}
        </PotCheckbox>
    </slot>

    <slot
        v-for="spec of updatedSpecs"
        name="checkbox"
        :spec="spec.target"
        :disabled="$props.disabled || spec.isDisabled"
        :selected="spec.isSelected"
        :value="spec.value"
        :label="spec.label"
        :on-change="() => onCheckboxChange(spec.value)"
    >
        <PotCheckbox
            :key="`PotCheckListCheckbox_${spec.value}`"
            :value="spec.isSelected"
            :disabled="$props.disabled || spec.isDisabled"
            :color="$props.color"
            :size="$props.size"
            :radius="$props.radius"
            @change="onCheckboxChange(spec.value)"
        >
            {{ spec.label }}
        </PotCheckbox>
    </slot>
</template>
