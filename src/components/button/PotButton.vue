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
import { defineAsyncComponent, computed, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Enums
import { POT_COLOR_THEME, POT_SIZE } from '@/enums/config';
import { POT_RADIUS } from '@/enums/components';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import type { TDeviceIs } from '@/types/composables';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    radius: POT_RADIUS.MEDIUM,
    size: POT_SIZE.MEDIUM,
    color: POT_COLOR_THEME.PRIMARY,
    devices: () => ALL_DEVICES_REVERSED,
    icon: '',
    preicon: '',
    square: false,
    disabled: false,
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

<style lang="scss">
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

    /* --- Colors - START --- */
    border-color: var(--pot-button-border-color);
    background-color: var(--pot-button-background-color);
    color: var(--pot-button-text-color);

    &:active:not(:disabled) {
        border-color: var(--pot-button-active-border-color);
        background-color: var(--pot-button-active-background-color);
        color: var(--pot-button-active-text-color);
    }

    &:not(:active, :disabled) {
        &:hover {
            border-color: var(--pot-button-hover-border-color);
            background-color: var(--pot-button-hover-background-color);
            color: var(--pot-button-hover-text-color);
        }
    }

    &:disabled {
        border-color: var(--pot-button-disabled-border-color);
        background-color: var(--pot-button-disabled-background-color);
        color: var(--pot-button-disabled-text-color);
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    $standard-size: (
        height: var(--pot-button-size-height),
        text: var(--pot-button-size-text),
        border: var(--pot-button-size-border),
        padding: var(--pot-button-size-padding),
        label-padding: var(--pot-button-size-label-padding),
    );

    @include size($standard-size) using ($size, $size-name) {
        height: map-get($size, 'height');
        padding: 0 map-get($size, 'padding');
        border-width: map-get($size, 'border');
        font-size: map-get($size, 'text');

        @include modificator(square) {
            padding: 0;
        }

        .pot-button__label {
            padding: 0 map-get($size, 'label-padding');
        }
    }

    /* --- Radius --- */
    @include radius();

    /* --- Flags --- */
    @include modificator(square) {
        aspect-ratio: 1 / 1;
    }

    &:disabled {
        cursor: not-allowed;
    }

    .pot-button__icon {
        flex-shrink: 0;
        width: 1.2em;
        height: 1.2em;
    }
}
</style>
