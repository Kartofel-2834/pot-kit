<template>
    <component
        :is="tag"
        :class="[$style.PotRadioElement, 'pot-radio-element', classList]"
        :style="colorThemeCssVars"
    >
        <span :class="[$style.marker, 'pot-radio-element__marker']" />

        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioElementProps } from '@/types/components';

// Enums
import { ERadius } from '@/enums/components';
import { EColorTheme } from '@/enums/config';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useColorTheme } from '@/composables/color-theme';

// Constants
import { ALL_DEVICES } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotRadioElementProps>(), {
    tag: 'div',
    color: EColorTheme.PRIMARY,
    radius: ERadius.CIRCLE,
    active: false,
    disabled: false,
    devices: () => ALL_DEVICES,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties(
        {
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
        color: Boolean($props.color),
        active: $props.active,
        disabled: $props.disabled,
    }),
);

/** Цветовая тема */
const colorThemeCssVars = computed(() => useColorTheme(properties.value.value.color));
</script>

<style lang="scss" module>
.PotRadioElement {
    display: flex;
    align-items: center;
    gap: 0.4em;
    user-select: none;
    cursor: pointer;
    transition: opacity var(--transition);

    /* --- Colors --- */
    @include modificator(color) {
        .marker {
            border-color: var(--base-400);
            background-color: var(--base-0);
            color: var(--color);

            &::before {
                background-color: var(--base-0);
            }
        }
    }

    /* --- Radius --- */
    @include radius('.marker');

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
    border: 1px solid;
    transition:
        background-color var(--transition),
        border-color var(--transition);

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 0.2em);
        height: calc(100% - 0.2em);
        border-radius: inherit;
        transform: translate(-50%, -50%) scale(0);
        transition: transform var(--transition);
    }
}
</style>
