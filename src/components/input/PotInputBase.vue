<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_INPUT_DEFAULTS } from '@/constants/defaults';
import type { TPropsDefaults } from '@/types';

const $propsDefaults = {
    devices: () => ALL_DEVICES_REVERSED,
};

const $configDefaults = usePropsDefaults(POT_INPUT_DEFAULTS);
</script>

<script lang="ts" generic="T = string" setup>
// Types
import type { IPotInputBaseProps } from '@/types/components';

// Vue
import { ref, computed, watch } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceIs } from '@/composables/device-is';
import { useDeviceProperties } from '@/composables/device-properties';

// Components
import PotIcon from '@/components/icon/PotIcon.vue';

const $props = withDefaults(defineProps<IPotInputBaseProps<T>>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotInputBaseProps<T>>);

const $emit = defineEmits<{
    input: [value: T];
    change: [value: T];
    'update:modelValue': [value: T];
    keydown: [value: KeyboardEvent];
    keyup: [value: KeyboardEvent];
}>();

const $deviceIs = useDeviceIs();

const isFocused = ref<boolean>(false);
const visibleValue = ref<string>('');

// Computed
const currentValue = computed<T>(() => ($props.value ?? $props.modelValue) as T);

const properties = computed(() => {
    return useDeviceProperties(
        {
            size: $props.size,
            color: $props.color,
            radius: $props.radius,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

/** Классы модификаторы */
const classList = computed(() =>
    useClassList({
        ...properties.value,
        focused: isFocused.value,
        disabled: $props.disabled,
        invalid: $props.invalid,
    }),
);

// Watch
watch(
    () => currentValue.value,
    newValue => {
        visibleValue.value = getFormattedValue(newValue);
    },
    {
        immediate: true,
    },
);

// Methods
function onInput(event: Event): void {
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    const parsedValue = getParsedValue(target.value);

    visibleValue.value = getFormattedValue(parsedValue);

    $emit('update:modelValue', parsedValue);
    $emit('input', parsedValue);
}

function onChange(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;

    $emit('change', getParsedValue(target.value));
}

function onFocus() {
    isFocused.value = true;
}

function onBlur() {
    isFocused.value = false;
}

function getFormattedValue(newValue: T): string {
    if (typeof $props.formatter === 'function') {
        return $props.formatter(newValue);
    }

    if (typeof newValue === 'string' || typeof newValue === 'number') {
        return String(newValue);
    }

    return '';
}

function getParsedValue(newValue: string): T {
    return typeof $props.parser === 'function' ? $props.parser(newValue) : (newValue as T);
}
</script>

<template>
    <label :class="['pot-input', classList]">
        <slot name="prepend"></slot>

        <slot name="preicon">
            <PotIcon
                v-if="$props.preicon"
                :icon="$props.preicon"
                class="pot-input__icon pot-input__icon_left"
            />
        </slot>

        <input
            v-model="visibleValue"
            :disabled="$props.disabled"
            class="pot-input__target"
            v-bind="$attrs"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
            @keydown="$emit('keydown', $event)"
            @keyup="$emit('keyup', $event)"
        />

        <slot name="icon">
            <PotIcon
                v-if="$props.icon"
                :icon="$props.icon"
                class="pot-input__icon pot-input__icon_right"
            />
        </slot>

        <slot name="append" />
    </label>
</template>

<style src="@/assets/css/preset/pot-input.css" />
