<template>
    <label :class="['pot-input', classList]">
        <slot name="prepend"></slot>

        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :icon="preicon"
                class="pot-input__icon pot-input__icon_left"
            />
        </slot>

        <input
            v-model="visibleValue"
            :disabled="disabled"
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
                v-if="icon"
                :icon="icon"
                class="pot-input__icon pot-input__icon_right"
            />
        </slot>

        <slot name="append" />
    </label>
</template>

<script lang="ts" generic="T = string" setup>
// Types
import type { IPotInputBaseProps } from '@/types/components';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Vue
import { ref, computed, defineAsyncComponent, watch } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceIs } from '@/composables/device-is';
import { useDeviceProperties } from '@/composables/device-properties';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotInputBaseProps<T>>(), {
    size: undefined,
    color: undefined,
    radius: undefined,
    disabled: false,
    invalid: false,
    devices: () => ALL_DEVICES_REVERSED,
});

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

<style src="@/assets/css/preset/pot-input.css" />

<style>
/*
PotInput - Colors Vars
--input-color-border                         / Цвет рамки
--input-color-background                     / Цвет фона
--input-color-text                           / Цвет текста
--input-color-icon                           / Цвет текста

--input-color-hover-border                   / Цвет рамки при наведении
--input-color-hover-background               / Цвет фона при наведении
--input-color-hover-text                     / Цвет текста при наведении
--input-color-hover-icon                     / Цвет текста при наведении

--input-color-focused-border                 / Цвет рамки при фокусе
--input-color-focused-background             / Цвет фона при фокусе
--input-color-focused-text                   / Цвет текста при фокусе
--input-color-focused-icon                   / Цвет текста при фокусе

--input-color-disabled-border                / Цвет рамки неактивного инпута
--input-color-disabled-background            / Цвет фона неактивного инпута
--input-color-disabled-text                  / Цвет текста неактивного инпута
--input-color-disabled-icon                  / Цвет текста неактивного инпута
*/

/*
PotInput - Sizes Vars:
--input-size-height           / Высота
--input-size-padding          / Паддинг
--input-size-border           / Размер рамки
--input-size-text             / Размер текста
--input-size-gap              / Паддинг текста
--input-size-icon             / Размер иконки
*/

.pot-input {
    display: flex;
    align-items: center;
    width: 100%;
    border-style: solid;
    cursor: text;
    background-color: inherit;
    font-weight: 400;
    line-height: 1;
    transition:
        color var(--pot-transition),
        background-color var(--pot-transition),
        border-color var(--pot-transition);

    /* Color */
    color: var(--input-color-text);
    border-color: var(--input-color-border);

    /* Size */
    padding: 0 var(--input-size-padding);
    gap: var(--input-size-gap);
    font-size: var(--input-size-text);
    border-width: var(--input-size-border);

    /* Radius */
    border-radius: var(--radius);
}

/* --- PotInput - Disabled --- */
.pot-input._disabled {
    cursor: not-allowed;

    /* Color */
    color: var(--input-color-disabled-text);
    border-color: var(--input-color-disabled-border);
}

.pot-input._disabled .pot-input__target {
    cursor: not-allowed;

    /* Color */
    color: var(--input-color-disabled-target-text);
    background-color: var(--input-color-disabled-target-background);
}

.pot-input._disabled .pot-input__icon {
    /* Color */
    color: var(--input-color-disabled-icon);
}

/* --- PotInput - Hover --- */
.pot-input:not(._disabled, ._focused):hover {
    color: var(--input-color-hover-text);
    border-color: var(--input-color-hover-border);
}

.pot-input:not(._disabled, ._focused):hover .pot-input__target {
    color: var(--input-color-hover-text);
    background-color: var(--input-color-hover-background);
}

.pot-input:not(._disabled, ._focused):hover .pot-input__icon {
    color: var(--input-color-hover-icon);
}

/* --- PotInput - Focused --- */
.pot-input:not(._disabled)._focused {
    color: var(--input-color-focused-text);
    border-color: var(--input-color-focused-border);
}

.pot-input:not(._disabled)._focused .pot-input__target {
    color: var(--input-color-focused-text);
    background-color: var(--input-color-focused-background);
}

.pot-input:not(._disabled)._focused .pot-input__icon {
    color: var(--input-color-focused-icon);
}

/* --- PotInput - Invalid --- */
.pot-input._invalid {
    border-color: var(--pot-color-invalid);
}

.pot-input._invalid .pot-input__icon {
    color: var(--pot-color-invalid);
}

.pot-input._invalid._focused {
    color: var(--pot-color-invalid);
}

.pot-input._invalid._focused .pot-input__icon {
    color: var(--pot-color-invalid);
}

/* ----------------------------------------------------------- */

.pot-input__target {
    outline: none;
    padding: 0;
    border: none;
    outline: none;
    font-family: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex-basis: 100%;
    font-size: inherit;

    /* Color */
    color: var(--input-color-text);
    background-color: var(--input-color-background);

    /* Size */
    height: var(--input-size-height);
}

.pot-input__target[type='number']::-webkit-inner-spin-button,
.pot-input__target[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.pot-input__target[disabled] {
    opacity: 1;
}

.pot-input__target::-ms-clear {
    display: none;
}

.pot-input__icon {
    pointer-events: none;
    width: 1.4em;
    font-size: inherit;
    transition: color var(--pot-transition);

    /* Color */
    color: var(--input-color-icon);
}
</style>
