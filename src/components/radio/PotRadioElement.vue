<template>
    <component
        :is="tag"
        :class="['pot-radio-element', classList]"
    >
        <span class="pot-radio-element__marker" />

        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioElementProps } from '@/types/components';
import type { TDeviceIs } from '@/types/composables';

// Enums
import { POT_RADIUS } from '@/enums/components';
import { POT_COLOR_THEME, POT_SIZE } from '@/enums/preset';

// Vue
import { computed, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotRadioElementProps>(), {
    tag: 'div',
    color: POT_COLOR_THEME.PRIMARY,
    size: POT_SIZE.MEDIUM,
    radius: POT_RADIUS.CIRCLE,
    active: false,
    disabled: false,
    invalid: false,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = inject<TDeviceIs>('deviceIs');

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
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

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value,
        active: $props.active,
        disabled: $props.disabled,
        invalid: $props.invalid,
    }),
);
</script>

<style lang="scss">
.pot-radio-element {
    display: flex;
    align-items: center;
    gap: 0.4em;
    font-size: inherit;
    font-weight: 400;
    line-height: 1;
    user-select: none;
    cursor: pointer;
    transition: opacity var(--pot-transition);

    /* --- Colors - START --- */
    color: var(--pot-radio-text-color);

    .pot-radio-element__marker {
        border-color: var(--pot-radio-marker-border-color);
        background-color: var(--pot-radio-marker-background-color);
        color: var(--pot-radio-marker-color);

        &::before {
            background-color: var(--pot-radio-marker-point-color);
        }
    }

    @include modificator(invalid) {
        color: inherit;

        .pot-radio-element__marker {
            border-color: var(--pot-color-invalid);
            background-color: transparent;
            color: var(--pot-color-invalid);

            &::before {
                background-color: var(--pot-color-invalid-text);
            }
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    $standard-size: (
        text: var(--pot-radio-size-text),
        marker: var(--pot-radio-size-marker),
    );

    @include size($standard-size) using ($size, $size-name) {
        font-size: map-get($size, 'text');

        .pot-radio-element__marker {
            width: map-get($size, 'marker');
            height: map-get($size, 'marker');
        }
    }

    /* --- Radius --- */
    @include radius('.pot-radio-element__marker');

    /* --- Flags --- */
    @include modificator(active) {
        .pot-radio-element__marker {
            border-color: currentColor;
            background-color: currentColor;
        }
    }

    @include modificator(disabled) {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.pot-radio-element__marker {
    position: relative;
    border: 1px solid;
    transition:
        background-color var(--pot-transition),
        border-color var(--pot-transition);

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: round(60%, 2px);
        aspect-ratio: 1 / 1;
        border-radius: inherit;
        transition: transform var(--pot-transition);
        transform: translate(-50%, -50%);
    }
}
</style>
