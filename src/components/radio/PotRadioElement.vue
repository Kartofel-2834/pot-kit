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

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotRadioElementProps>(), {
    tag: 'div',
    color: 'clay',
    radius: '100',
    active: false,
    disabled: false,
    breakpoints: () => ALL_DEVICES,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: {
            color: $props.color,
            radius: $props.radius,
        },
    });
});

/**
 * Классы модификаторы компонента
 */
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
    user-select: none;
    cursor: pointer;
    transition: opacity $default-transition;

    /* --- Colors --- */
    @include modificator(color, clay) {
        .marker {
            border-color: $base-400;
            background-color: $base-0;
            color: $clay-pot-0;

            &::before {
                background-color: $base-0;
            }
        }
    }

    /* --- Border radius --- */
    @include modificator(radius, 4) {
        .marker {
            border-radius: 0.4rem;
        }
    }

    @include modificator(radius, 6) {
        .marker {
            border-radius: 0.6rem;
        }
    }

    @include modificator(radius, 8) {
        .marker {
            border-radius: 0.8rem;
        }
    }

    @include modificator(radius, 100) {
        .marker {
            border-radius: 100rem;
        }
    }

    /* --- Flags --- */
    @include modificator(active) {
        .marker {
            border-color: currentColor;
            background-color: currentColor;

            &::before {
                transform: translate(-50%, -50%) scale(1);
            }
        }
    }

    @include modificator(disabled) {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.marker {
    position: relative;
    display: block;
    width: 0.6em;
    height: 0.6em;
    border-radius: 0.8rem;
    border: 1px solid;
    transition:
        background-color $default-transition,
        border-color $default-transition;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 0.2em);
        height: calc(100% - 0.2em);
        border-radius: inherit;
        transform: translate(-50%, -50%) scale(0);
        transition: transform $default-transition;
    }
}
</style>
