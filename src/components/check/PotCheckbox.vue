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

<script lang="ts" setup>
// Types
import type { IPotCheckboxProps, CheckboxValue } from '@/types/components/pot-checkbox-types';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Components
import PotIcon from '@/components/icon/PotIcon.vue';

const $props = withDefaults(defineProps<IPotCheckboxProps>(), {
    value: null,
    modelValue: null,
    disabled: false,
    trueValue: true,
    falseValue: false,
    icon: 'check',
    color: 'clay',
    breakpoints: 'desktop tablet mobile',
});

const $emit = defineEmits<{
    change: [newValue: CheckboxValue];
    'update:modelValue': [newValue: CheckboxValue];
}>();

/**
 * value с поддержкой v-model
 */
const currentValue = computed<CheckboxValue>(() => $props.value ?? $props.modelValue ?? null);

/**
 * Чекбокс считается выбранным,
 * если его текущее значение равно свойству `trueValue`.
 */
const isChecked = computed<boolean>(() => currentValue.value === $props.trueValue);
/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: { color: $props.color },
    });
});

/**
 * Классы модификаторы компонента
 */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        checked: isChecked.value,
        disabled: $props.disabled,
    }),
);

function onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const updatedValue = target.checked ? $props.trueValue : $props.falseValue;

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
    cursor: pointer;
    user-select: none;
    transition: opacity $default-transition;

    /* --- Colors --- */
    @include modificator(color, clay) {
        @include modificator(checked) {
            .iconWrapper {
                border-color: $clay-pot-0;
                background-color: $clay-pot-0;
                color: $base-0;
            }
        }
    }

    /* --- Flags --- */
    @include modificator(checked) {
        .icon {
            transform: scale(1);
        }
    }

    @include modificator(disabled) {
        opacity: .75;
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
        color $default-transition,
        border-color $default-transition,
        background-color $default-transition;
}

.icon {
    width: 0.8em;
    transform: scale(0);
    transition: transform $default-transition;
}
</style>
