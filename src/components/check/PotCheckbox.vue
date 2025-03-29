<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_CHECKBOX_DEFAULTS } from '@/constants/defaults';

const $propsDefaults = {
    value: undefined,
    modelValue: undefined,
    trueValue: undefined,
    falseValue: undefined,
    disabled: false,
    invalid: false,
    icon: 'check',
    color: null,
    size: null,
    radius: null,
    devices: () => ALL_DEVICES_REVERSED,
};

const $configDefaults = usePropsDefaults(POT_CHECKBOX_DEFAULTS);
</script>

<script lang="ts" generic="T extends TSpecValue = boolean" setup>
// Types
import type { TSpecValue } from '@/types/composables';
import type { IPotCheckboxProps } from '@/types/components';
import type { TPropsDefaults } from '@/types';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

// Components
import PotIcon from '@/components/icon/PotIcon.vue';

const $props = withDefaults(defineProps<IPotCheckboxProps<T>>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotCheckboxProps<T>>);

const $emit = defineEmits<{
    change: [newValue: T | boolean];
    'update:modelValue': [newValue: T | boolean];
}>();

const $deviceIs = useDeviceIs();

/** value с поддержкой v-model */
const currentValue = computed<T | null>(() => $props.value ?? $props.modelValue ?? null);

/**
 * Чекбокс считается выбранным,
 * если его текущее значение равно свойству `trueValue`.
 */
const isChecked = computed<boolean>(() => {
    const currentTrueValue = $props.trueValue === undefined ? true : $props.trueValue;
    return currentValue.value === currentTrueValue;
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties(
        {
            color: $props.color,
            size: $props.size,
            radius: $props.radius,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value,
        checked: isChecked.value,
        invalid: $props.invalid,
        disabled: $props.disabled,
    }),
);

function onChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    let updatedValue: T | boolean;

    if (target.checked) {
        updatedValue = $props.trueValue === undefined ? true : $props.trueValue;
    } else {
        updatedValue = $props.falseValue === undefined ? false : $props.falseValue;
    }

    $emit('change', updatedValue);
    $emit('update:modelValue', updatedValue);
}
</script>

<template>
    <label :class="['pot-checkbox', classList]">
        <input
            :value="currentValue"
            :disabled="$props.disabled"
            :checked="isChecked"
            class="pot-checkbox__input"
            type="checkbox"
            @change="onChange"
        />

        <slot name="content">
            <div class="pot-checkbox__icon-wrapper">
                <slot name="icon">
                    <PotIcon
                        v-if="$props.icon"
                        :icon="$props.icon"
                        class="pot-checkbox__icon"
                    />
                </slot>
            </div>

            <span class="pot-checkbox__label">
                <slot />
            </span>
        </slot>
    </label>
</template>

<style src="@/assets/css/base/pot-checkbox.css" />
<style src="@/assets/css/configuration/pot-checkbox.css" />
<style src="@/assets/css/preset/pot-checkbox.css" />
