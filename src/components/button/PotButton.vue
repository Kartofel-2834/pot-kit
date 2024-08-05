<template>
    <component
        :is="tag"
        :class="[$style.PotButton, classList]"
    >
        <slot />

        {{ properties }}
    </component>
</template>

<script lang="ts" setup>
// Vue
import { withDefaults, computed, useCssModule } from 'vue';

// Types
import type { IPotButtonProps } from '@/types/components/pot-button-types';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';

// Props
const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    size: '32',
    color: 'red',
    breakpoints: 'desktop tablet mobile',
});

const $style = useCssModule();

// Computed
const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: {
            size: $props.size,
            color: $props.color,
        },
    });
});

const currentSize = computed(() => properties.value?.value?.size || null);
const currentColor = computed(() => properties.value?.value?.color || null);

const classList = computed<Record<string, boolean>>(() => ({
    [$style[`_size-${currentSize.value}`]]: Boolean(currentSize.value),
    [$style[`_color-${currentColor.value}`]]: Boolean(currentColor.value),
}));
</script>

<style lang="scss" module>
.PotButton {
    background-color: $soup-pot;
    color: $base-0;
    transition: $default-transition;
    transform: scale(2);
    cursor: pointer;

    /* --- Sizes --- */
    &._size-32 {
        height: 3.2rem;
    }

    &._size-48 {
        height: 4.8rem;
    }

    &._size-56 {
        height: 5.6rem;
    }

    /* --- Colors --- */
    &._color-red {
        background-color: red;
    }

    &._color-blue {
        background-color: blue;
    }

    &._color-green {
        background-color: green;
    }
}
</style>
