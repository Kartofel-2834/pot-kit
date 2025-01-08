<template>
    <label
        :class="[$style.PotInputBase, 'pot-input-base', classList]"
        :style="colorThemeCssVars"
    >
        <slot name="prepend" />

        <PotIcon
            v-if="preicon"
            :class="[$style.icon, 'pot-input-base__icon', 'pot-input-base__icon_left']"
            :icon="preicon"
        />

        <input
            :value="visibleValue"
            :class="[$style.input, 'pot-input-base__target']"
            :disabled="disabled"
            v-bind="$attrs"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
        />

        <PotIcon
            v-if="icon"
            :class="[$style.icon, 'pot-input-base__icon', 'pot-input-base__icon_right']"
            :icon="icon"
        />

        <slot name="append" />
    </label>
</template>

<script lang="ts" setup>
// Types
import type { IPotInputBaseProps } from '@/types/components';

// Enums
import { EColorTheme } from '@/enums/config';
import { ERadius, ESize } from '@/enums/components';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Vue
import { ref, computed, defineAsyncComponent } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useColorTheme } from '@/composables/color-theme';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotInputBaseProps>(), {
    size: ESize.MEDIUM,
    color: EColorTheme.PRIMARY,
    radius: ERadius.ROUNDED_B,
    disabled: false,
    devices: () => ALL_DEVICES_REVERSED,
});

const $emit = defineEmits<{
    input: [value: unknown];
    change: [value: unknown];
    'update:modelValue': [value: unknown];
}>();

const isFocused = ref<boolean>(false);

// Computed
const currentValue = computed<unknown>(() =>
    typeof $props.value === 'string' ? $props.value : $props.modelValue,
);

const visibleValue = computed<string>(() => {
    if (typeof $props.formatter === 'function') {
        return $props.formatter(currentValue.value);
    }

    if (typeof currentValue.value === 'string' || typeof currentValue.value === 'number') {
        return String(currentValue.value);
    }

    return '';
});

const properties = computed(() => {
    return useDeviceProperties(
        {
            size: $props.size,
            color: $props.color,
            radius: $props.radius,
        },
        $props.devices,
    );
});

/** Классы модификаторы */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        color: Boolean($props.color),
        focused: isFocused.value,
        disabled: $props.disabled,
    }),
);

/** Цветовая тема */
const colorThemeCssVars = computed(() => useColorTheme(properties.value.value.color ?? undefined));

// Methods
function onInput(event: Event): void {
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    const parsedValue = getParsedValue(target.value);

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

function getParsedValue(newValue: string): unknown {
    return typeof $props.parser === 'function' ? $props.parser(newValue) : newValue;
}
</script>

<style lang="scss" module>
.PotInputBase {
    display: flex;
    align-items: center;
    width: 100%;
    border: 2px solid;
    cursor: text;
    transition: border-color var(--transition);

    /* --- Colors --- */
    @include modificator(color) {
        border-color: var(--base-400);

        @include modificator(disabled) {
            .input {
                color: var(--base-400);
            }
        }

        @include exclude-modificators(disabled) {
            &:hover {
                border-color: var(--base-500);

                .icon {
                    color: var(--base-500);
                }
            }

            @include modificator(focused) {
                border-color: var(--color);

                .icon {
                    color: currentColor;
                }
            }
        }

        .icon {
            color: var(--base-400);
        }
    }

    /* --- Sizes --- */
    @include modificator(size, tiny) {
        @include text(t4);

        padding: 0 var(--spacer);
        gap: var(--unit);

        .input {
            height: var(--tiny-size);
        }
    }

    @include modificator(size, small) {
        @include text(t3);

        padding: 0 var(--spacer);
        gap: var(--spacer-0-750);

        .input {
            height: var(--small-size);
        }
    }

    @include modificator(size, medium) {
        @include text(t1);

        padding: 0 var(--spacer-1-500);
        gap: var(--spacer);

        .input {
            height: var(--medium-size);
        }
    }

    @include modificator(size, large) {
        @include text(t0);

        padding: 0 var(--spacer-2);
        gap: var(--spacer-1-500);

        .input {
            height: var(--large-size);
        }
    }

    /* --- Radius --- */
    @include radius();

    /* --- Flags --- */
    @include modificator(disabled) {
        cursor: not-allowed;

        .input {
            cursor: not-allowed;
        }
    }

    .input {
        outline: none;
        padding: 0;
        border: none;
        background-color: transparent;
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

    .icon {
        pointer-events: none;
        width: 1.4em;
        font-size: inherit;
        transition: var(--transition);
    }
}
</style>
