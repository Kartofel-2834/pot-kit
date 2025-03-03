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

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED, useDeviceIs } from '@/composables/device-is';

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

const $deviceIs = useDeviceIs();

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
        square: $props.square,
    }),
);
</script>

<style src="@/assets/css/preset/pot-button.css" />

<style>
/*
PotButton - Colors Vars
--button-color-border                  / Цвет рамки
--button-color-background              / Цвет фона
--button-color-text                    / Цвет текста

--button-color-hover-border            / Цвет рамки при наведении
--button-color-hover-background        / Цвет фона при наведении
--button-color-hover-text              / Цвет текста при наведении

--button-color-active-border           / Цвет рамки при нажатии
--button-color-active-background       / Цвет фона при нажатии
--button-color-active-text             / Цвет текста при нажатии

--button-color-disabled-border         / Цвет рамки у неактивной кнопки
--button-color-disabled-background     / Цвет фона у неактивной кнопки
--button-color-disabled-text           / Цвет текста у неактивной кнопки
*/

/*
PotButton - Sizes Vars:
--button-size-height           / Высота
--button-size-padding          / Паддинг
--button-size-border           / Размер рамки
--button-size-text             / Размер текста
--button-size-gap              / Паддинг текста
--button-size-icon             / Размер иконки
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

    /* Size */
    gap: var(--button-size-gap);
    height: var(--button-size-height);
    padding: 0 var(--button-size-padding);
    border-width: var(--button-size-border);
    font-size: var(--button-size-text);

    /* Radius */
    border-radius: var(--radius);

    /* Color */
    border-color: var(--button-color-border);
    background-color: var(--button-color-background);
    color: var(--button-color-text);
}

/* --- PotButton - Active ---  */
.pot-button:active:not(:disabled) {
    /* Color */
    border-color: var(--button-color-active-border);
    background-color: var(--button-color-active-background);
    color: var(--button-color-active-text);
}

/* --- PotButton - Hover --- */
.pot-button:not(:active, :disabled):hover {
    /* Color */
    border-color: var(--button-color-hover-border);
    background-color: var(--button-color-hover-background);
    color: var(--button-color-hover-text);
}

/* --- PotButton - Disabled --- */
.pot-button:disabled {
    cursor: not-allowed;

    /* Color */
    border-color: var(--button-color-disabled-border);
    background-color: var(--button-color-disabled-background);
    color: var(--button-color-disabled-text);
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
    width: var(--button-size-icon);
}
</style>
