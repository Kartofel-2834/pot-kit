<template>
    <component
        :is="tag"
        :class="['pot-button', classList]"
        :disabled="disabled"
    >
        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :icon="preicon"
                class="pot-button__icon pot-button__icon_pre"
            />
        </slot>

        <span
            v-if="$slots?.default"
            class="pot-button__label"
        >
            <slot />
        </span>

        <slot name="icon">
            <PotIcon
                v-if="icon"
                :icon="icon"
                class="pot-button__icon pot-button__icon_post"
            />
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotButtonProps } from '@/types/components';
import type { TDeviceIs } from '@/types/composables';

// Vue
import { defineAsyncComponent, computed, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    radius: 'circle',
    size: null,
    color: null,
    devices: () => ALL_DEVICES_REVERSED,
    icon: '',
    preicon: '',
    square: false,
    disabled: false,
    unstyled: false,
});

const $deviceIs = inject<TDeviceIs>('deviceIs');

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
        square: $props.square,
    }),
);
</script>

<style src="@/assets/css/preset/pot-button.css" />

<style>
/*
PotButton - Colors Vars
--color-button-border                  / Цвет рамки
--color-button-background              / Цвет фона
--color-button-text                    / Цвет текста

--color-button-hover-border            / Цвет рамки при наведении
--color-button-hover-background        / Цвет фона при наведении
--color-button-hover-text              / Цвет текста при наведении

--color-button-active-border           / Цвет рамки при нажатии
--color-button-active-background       / Цвет фона при нажатии
--color-button-active-text             / Цвет текста при нажатии

--color-button-disabled-border         / Цвет рамки у неактивной кнопки
--color-button-disabled-background     / Цвет фона у неактивной кнопки
--color-button-disabled-text           / Цвет текста у неактивной кнопки
*/

/*
PotButton - Sizes Vars:
--size-height           / Высота
--size-padding          / Паддинг
--size-border           / Размер рамки
--size-text             / Размер текста
--size-gap              / Паддинг текста
--size-icon             / Размер иконки
*/

/* --- PotButton --- */
.pot-button {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    user-select: none;
    border-style: solid;
    font-weight: 500;
    line-height: 1;
    transition:
        color var(--pot-transition),
        border-color var(--pot-transition),
        background-color var(--pot-transition);

    /* --- Colors --- */
    border-color: var(--color-button-border);
    background-color: var(--color-button-background);
    color: var(--color-button-text);

    /* --- Size --- */
    gap: var(--size-gap);
    height: var(--size-height);
    padding: 0 var(--size-padding);
    border-width: var(--size-border);
    font-size: var(--size-text);

    /* --- Radius --- */
    border-radius: var(--radius);
}

/* --- PotButton - Active ---  */
.pot-button:active:not(:disabled) {
    /* --- Colors --- */
    border-color: var(--color-button-active-border);
    background-color: var(--color-button-active-background);
    color: var(--color-button-active-text);
}

/* --- PotButton - Hover --- */
.pot-button:not(:active, :disabled):hover {
    /* --- Colors --- */
    border-color: var(--color-button-hover-border);
    background-color: var(--color-button-hover-background);
    color: var(--color-button-hover-text);
}

/* --- PotButton - Disabled --- */
.pot-button:disabled {
    cursor: not-allowed;

    /* --- Colors --- */
    border-color: var(--color-button-disabled-border);
    background-color: var(--color-button-disabled-background);
    color: var(--color-button-disabled-text);
}

/* --- PotButton - Square --- */
.pot-button._square {
    padding: 0;
    aspect-ratio: 1 / 1;
}

/* ----------------------------------------------------------- */

.pot-button__icon {
    flex-shrink: 0;
    aspect-ratio: 1 / 1;
    width: var(--size-icon);
}
</style>
