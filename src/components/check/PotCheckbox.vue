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

<script lang="ts">
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

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_CHECKBOX_DEFAULTS } from '@/constants/defaults';

// Components
import PotIcon from '@/components/icon/PotIcon.vue';

const $props = withDefaults(defineProps<IPotCheckboxProps<T>>(), {
    ...($propsDefaults as TPropsDefaults<IPotCheckboxProps<T>>),
    ...(POT_CHECKBOX_DEFAULTS as TPropsDefaults<IPotCheckboxProps<T>>),
});

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

<style src="@/assets/css/preset/pot-checkbox.css" />

<style>
/*
PotCheckbox - Colors Vars
--checkbox-color-text                            / Цвет текста
--checkbox-color-background                      / Цвет фона
--checkbox-color-icon                            / Цвет иконки
--checkbox-color-border                          / Цвет рамки

--checkbox-color-hover-text                      / Цвет текста при наведении
--checkbox-color-hover-border                    / Цвет рамки при наведении
--checkbox-color-hover-background                / Цвет фона при наведении
--checkbox-color-hover-icon                      / Цвет иконки при наведении

--checkbox-color-checked-text                    / Цвет текста выбранного чекбокса
--checkbox-color-checked-border                  / Цвет рамки выбранного чекбокса
--checkbox-color-checked-background              / Цвет фона выбранного чекбокса
--checkbox-color-checked-icon                    / Цвет иконки выбранного чекбокса

--checkbox-color-checked-hover-text              / Цвет текста при наведении на выбранный чекбокс
--checkbox-color-checked-hover-border            / Цвет рамки при наведении на выбранный чекбокс
--checkbox-color-checked-hover-background        / Цвет фона при наведении на выбранный чекбокс
--checkbox-color-checked-hover-icon              / Цвет иконки при наведении на выбранный чекбокс

--checkbox-color-disabled-text                   / Цвет текста при наведении на выбранный чекбокс
--checkbox-color-disabled-border                 / Цвет рамки при наведении на выбранный чекбокс
--checkbox-color-disabled-background             / Цвет фона при наведении на выбранный чекбокс
--checkbox-color-disabled-icon                   / Цвет иконки при наведении на выбранный чекбокс
*/

/*
PotCheckbox - Sizes Vars:
--checkbox-size-text           / Размер текста
--checkbox-size-height         / Высота
--checkbox-size-icon           / Размер иконки
--checkbox-size-border         / Размер рамки
--checkbox-size-gap            / Размер расстояния между чекбоксом и его текстом
*/
.pot-checkbox {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: inherit;
    font-weight: 400;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition: color var(--pot-transition);

    /* Size */
    gap: var(--checkbox-size-gap);
    font-size: var(--checkbox-size-text);

    /* Color */
    color: var(--checkbox-color-text);
}

/* --- PotCheckbox - Hover --- */
.pot-checkbox:not(._disabled):hover {
    /* Color */
    color: var(----checkbox-color-hover-text);
}

.pot-checkbox:not(._disabled):hover .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: var(--checkbox-color-hover-background);
    border-color: var(--checkbox-color-hover-border);
    color: var(--checkbox-color-hover-icon);
}

/* --- PotCheckbox - Checked --- */
.pot-checkbox:not(._disabled)._checked {
    /* Color */
    color: var(--checkbox-color-checked-text);
}

.pot-checkbox:not(._disabled)._checked .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: var(--checkbox-color-checked-background);
    border-color: var(--checkbox-color-checked-border);
    color: var(--checkbox-color-checked-icon);
}

.pot-checkbox._checked .pot-checkbox__icon {
    transform: scale(1);
}

/* --- PotCheckbox - Checked - Hover --- */
.pot-checkbox:not(._disabled)._checked:hover {
    /* Color */
    color: var(--checkbox-color-checked-hover-text);
}

.pot-checkbox:not(._disabled)._checked:hover .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: var(--checkbox-color-checked-hover-background);
    border-color: var(--checkbox-color-checked-hover-border);
    color: var(--checkbox-color-checked-hover-icon);
}

/* --- PotCheckbox - Invalid --- */
.pot-checkbox:not(._disabled)._invalid .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: transparent;
    border-color: var(--pot-color-invalid);
    color: var(--pot-color-invalid-text);
}

.pot-checkbox:not(._disabled)._invalid._checked .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: var(--pot-color-invalid);
    border-color: var(--pot-color-invalid);
    color: var(--pot-color-invalid-text);
}

/* --- PotCheckbox - Disabled --- */
.pot-checkbox._disabled {
    cursor: not-allowed;

    /* Color */
    color: var(--checkbox-color-disabled-text);
}

.pot-checkbox._disabled .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: var(--checkbox-color-disabled-background);
    border-color: var(--checkbox-color-disabled-border);
    color: var(--checkbox-color-disabled-icon);
}

.pot-checkbox._disabled._checked .pot-checkbox__icon-wrapper {
    /* Color */
    background-color: var(--checkbox-color-disabled-checked-background);
}

/* ----------------------------------------------------------- */

.pot-checkbox__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    border-style: solid;
    transition:
        color var(--pot-transition),
        border-color var(--pot-transition),
        background-color var(--pot-transition);

    /* Size */
    width: var(--checkbox-size-height);
    border-width: var(--checkbox-size-border);
    border-radius: var(--radius);

    /* Color */
    background-color: var(--checkbox-color-background);
    border-color: var(--checkbox-color-border);
    color: var(--checkbox-color-icon);
}

.pot-checkbox__input {
    display: none;
}

.pot-checkbox__icon {
    width: var(--checkbox-size-icon);
    transform: scale(0);
    transition: transform var(--pot-transition);
}
</style>
