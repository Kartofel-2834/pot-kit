<template>
    <label :class="[$style.PotCheckbox, 'pot-checkbox', classList]">
        <input
            :value="currentValue"
            :class="[$style.input, 'pot-checkbox__input']"
            :disabled="disabled"
            :checked="isChecked"
            type="checkbox"
            @change="onChange"
        />

        <slot name="content">
            <div :class="[$style.iconWrapper, 'pot-checkbox__icon-wrapper']">
                <slot name="icon">
                    <PotIcon
                        v-if="icon"
                        :icon="icon"
                        :class="[$style.icon, 'pot-checkbox__icon']"
                    />
                </slot>
            </div>

            <span :class="[$style.label, 'pot-checkbox__label']">
                <slot />
            </span>
        </slot>
    </label>
</template>

<script lang="ts" generic="T extends TCheckboxValue = boolean" setup>
// Types
import type { IPotCheckboxProps, TCheckboxValue } from '@/types/components';

// Enums
import { EColorTheme, ESize } from '@/enums/config';
import { ERadius } from '@/enums/components';

// Vue
import { computed, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Components
import PotIcon from '@/components/icon/PotIcon.vue';
import type { TDeviceIs } from '@/types/composables';

const $props = withDefaults(defineProps<IPotCheckboxProps<T>>(), {
    value: undefined,
    modelValue: undefined,
    trueValue: undefined,
    falseValue: undefined,
    disabled: false,
    invalid: false,
    icon: 'check',
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
    radius: ERadius.MEDIUM,
    devices: () => ALL_DEVICES_REVERSED,
});

const $emit = defineEmits<{
    change: [newValue: T | boolean];
    'update:modelValue': [newValue: T | boolean];
}>();

const $deviceIs = inject<TDeviceIs>('deviceIs');

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
        $deviceIs?.device?.value,
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

<style lang="scss" module>
.PotCheckbox {
    display: flex;
    align-items: center;
    gap: 0.4em;
    font-size: inherit;
    font-weight: 400;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition: opacity var(--pot-transition);

    /* --- Colors - START --- */
    color: var(--pot-checkbox-text-color);

    .iconWrapper {
        background-color: var(--pot-checkbox-background-color);
        border-color: var(--pot-checkbox-border-color);
        color: var(--pot-checkbox-icon-color);
    }

    @include modificator(checked) {
        .iconWrapper {
            background-color: var(--pot-checkbox-checked-background-color);
            border-color: var(--pot-checkbox-checked-border-color);
            color: var(--pot-checkbox-checked-icon-color);
        }
    }

    @include modificator(invalid) {
        color: var(--pot-color-invalid);

        .iconWrapper {
            background-color: transparent;
            border-color: var(--pot-color-invalid);
            color: var(--pot-color-invalid-text);
        }

        @include modificator(checked) {
            .iconWrapper {
                background-color: var(--pot-color-invalid);
                border-color: var(--pot-color-invalid);
                color: var(--pot-color-invalid-text);
            }
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    $standard-size: (
        height: var(--pot-checkbox-size-height),
        text: var(--pot-checkbox-size-text),
    );

    @include size($standard-size) using ($size, $size-name) {
        font-size: map-get($size, 'text');

        .iconWrapper {
            width: map-get($size, 'height');
        }
    }

    /* --- Flags --- */
    @include modificator(checked) {
        .icon {
            transform: scale(1);
        }
    }

    /* --- Radius --- */
    @include radius('.iconWrapper');

    @include modificator(disabled) {
        opacity: 0.75;
        cursor: not-allowed;
    }
}

.input {
    display: none;
}

.iconWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.125em;
    aspect-ratio: 1 / 1;
    border: 1px solid;
    transition:
        color var(--pot-transition),
        border-color var(--pot-transition),
        background-color var(--pot-transition);
}

.icon {
    width: 75%;
    transform: scale(0);
    transition: transform var(--pot-transition);
}
</style>
