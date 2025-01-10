<template>
    <label :class="[$style.PotInputBase, 'pot-input-base', classList]">
        <slot name="prepend" />

        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :class="[$style.icon, 'pot-input-base__icon', 'pot-input-base__icon_left']"
                :icon="preicon"
            />
        </slot>

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

        <slot name="icon">
            <PotIcon
                v-if="icon"
                :class="[$style.icon, 'pot-input-base__icon', 'pot-input-base__icon_right']"
                :icon="icon"
            />
        </slot>

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

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotInputBaseProps>(), {
    size: ESize.MEDIUM,
    color: EColorTheme.PRIMARY,
    radius: ERadius.MEDIUM,
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
        focused: isFocused.value,
        disabled: $props.disabled,
    }),
);

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
    background-color: inherit;
    color: inherit;
    transition:
        color var(--pot-transition),
        background-color var(--pot-transition),
        border-color var(--pot-transition);

    /* --- Colors --- */
    @include color-theme() {
        border-color: var(--pot-theme-target-subcolor);

        @include modificator(disabled) {
            .input {
                color: var(--pot-theme-disabled-color);
            }
        }

        @include exclude-modificators(disabled) {
            @include modificator(focused) {
                border-color: var(--pot-theme-target-color);

                .icon {
                    color: var(--pot-theme-target-color);
                }
            }
        }

        .icon {
            color: var(--pot-theme-target-subcolor);
        }
    }

    /* --- Sizes --- */
    @include modificator(size, tiny) {
        @include text(t8);

        padding: 0 var(--pot-spacer);
        gap: var(--pot-unit);

        .input {
            height: var(--pot-size-tiny);
        }
    }

    @include modificator(size, small) {
        @include text(t7);

        padding: 0 var(--pot-spacer);
        gap: var(--pot-spacer-0-800);

        .input {
            height: var(--pot-size-small);
        }
    }

    @include modificator(size, medium) {
        @include text(t6);

        padding: 0 var(--pot-spacer-1-200);
        gap: var(--pot-spacer);

        .input {
            height: var(--pot-size-medium);
        }
    }

    @include modificator(size, big) {
        @include text(t5);

        padding: 0 var(--pot-spacer-1-400);
        gap: var(--pot-spacer);

        .input {
            height: var(--pot-size-big);
        }
    }

    @include modificator(size, large) {
        @include text(t4);

        padding: 0 var(--pot-spacer-1-600);
        gap: var(--pot-spacer-1-600);

        .input {
            height: var(--pot-size-large);
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
        transition: var(--pot-transition);
    }
}
</style>
