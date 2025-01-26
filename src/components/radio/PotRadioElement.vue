<template>
    <component
        :is="tag"
        :class="[$style.PotRadioElement, 'pot-radio-element', classList]"
    >
        <span :class="[$style.marker, 'pot-radio-element__marker']" />

        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioElementProps } from '@/types/components';

// Enums
import { ERadius, ESize } from '@/enums/components';
import { EColorTheme } from '@/enums/config';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotRadioElementProps>(), {
    tag: 'div',
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
    radius: ERadius.CIRCLE,
    active: false,
    disabled: false,
    devices: () => ALL_DEVICES_REVERSED,
});

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
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        active: $props.active,
        disabled: $props.disabled,
    }),
);
</script>

<style lang="scss" module>
.PotRadioElement {
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

    .marker {
        border-color: var(--pot-radio-marker-border-color);
        background-color: var(--pot-radio-marker-background-color);
        color: var(--pot-radio-marker-color);

        &::before {
            background-color: var(--pot-radio-marker-point-color);
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

        .marker {
            width: map-get($size, 'marker');
            height: map-get($size, 'marker');
        }
    }

    /* --- Radius --- */
    @include radius('.marker');

    /* --- Flags --- */
    @include modificator(active) {
        .marker {
            border-color: currentColor;
            background-color: currentColor;
        }
    }

    @include modificator(disabled) {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.marker {
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
