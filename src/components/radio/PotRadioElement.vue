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
import { ALL_DEVICES } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotRadioElementProps>(), {
    tag: 'div',
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
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
    user-select: none;
    cursor: pointer;
    transition: opacity var(--pot-transition);

    /* --- Colors --- */
    @include color-theme() {
        .marker {
            border-color: var(--pot-base-400);
            background-color: var(--pot-base-0);
            color: var(--pot-theme-target-color);

            &::before {
                background-color: var(--pot-base-0);
            }
        }
    }

    /* --- Sizes --- */
    @include modificator(size, tiny) {
        @include text(t7);
    }

    @include modificator(size, small) {
        @include text(t6);
    }

    @include modificator(size, medium) {
        @include text(t4);
    }

    @include modificator(size, big) {
        @include text(t3);
    }

    @include modificator(size, large) {
        @include text(t2);
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.6em;
    height: 0.6em;
    border: 1px solid;
    transition:
        background-color var(--pot-transition),
        border-color var(--pot-transition);

    &::before {
        content: '';
        width: calc(100% - 0.2em);
        height: calc(100% - 0.2em);
        border-radius: inherit;
        transition: transform var(--pot-transition);
    }
}
</style>
