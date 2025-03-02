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
import type { TDeviceIs } from '@/types/composables';

// Enums
import { POT_COLOR_THEME, POT_SIZE } from '@/enums/preset';
import { POT_RADIUS } from '@/enums/components';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Vue
import { ref, computed, defineAsyncComponent, watch, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotInputBaseProps<T>>(), {
    size: POT_SIZE.MEDIUM,
    color: POT_COLOR_THEME.PRIMARY,
    radius: POT_RADIUS.MEDIUM,
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

const $deviceIs = inject<TDeviceIs>('deviceIs');

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
        $deviceIs?.device?.value,
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

<style lang="scss">
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

    /* --- Colors - START --- */
    color: var(--pot-input-text-color);
    border-color: var(--pot-input-border-color);

    .pot-input__target {
        color: var(--pot-input-target-text-color);
        background-color: var(--pot-input-target-background-color);
    }

    .pot-input__icon {
        color: var(--pot-input-icon-color);
    }

    @include modificator(disabled) {
        color: var(--pot-input-disabled-text-color);
        border-color: var(--pot-input-disabled-border-color);

        .pot-input__target {
            color: var(--pot-input-disabled-target-text-color);
            background-color: var(--pot-input-disabled-target-background-color);
        }

        .pot-input__icon {
            color: var(--pot-input-disabled-icon-color);
        }
    }

    @include exclude-modificator(disabled) {
        @include modificator(focused) {
            color: var(--pot-input-focused-text-color);
            border-color: var(--pot-input-focused-border-color);

            .pot-input__target {
                color: var(--pot-input-focused-target-text-color);
                background-color: var(--pot-input-focused-target-background-color);
            }

            .pot-input__icon {
                color: var(--pot-input-focused-icon-color);
            }
        }

        @include modificator(invalid) {
            border-color: var(--pot-color-invalid);

            .pot-input__icon {
                color: var(--pot-color-invalid);
            }

            @include modificator(focused) {
                border-color: var(--pot-color-invalid);

                .pot-input__icon {
                    color: var(--pot-color-invalid);
                }
            }
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    $standard-size: (
        height: var(--pot-input-size-height),
        text: var(--pot-input-size-text),
        padding: var(--pot-input-size-padding),
        gap: var(--pot-input-size-gap),
    );

    @include size($standard-size) using ($size, $size-name) {
        padding: 0 map-get($size, 'padding');
        gap: map-get($size, 'gap');
        font-size: map-get($size, 'text');

        border-width: var(--pot-input-size-border);

        .pot-input__target {
            height: map-get($size, 'height');
        }
    }

    /* --- Radius --- */
    @include radius();

    /* --- Flags --- */
    @include modificator(disabled) {
        cursor: not-allowed;

        .pot-input__target {
            cursor: not-allowed;
        }
    }
}

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

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[disabled] {
        opacity: 1;
    }

    &::-ms-clear {
        display: none;
    }
}

.pot-input__icon {
    pointer-events: none;
    width: 1.4em;
    font-size: inherit;
    transition: color var(--pot-transition);
}
</style>
