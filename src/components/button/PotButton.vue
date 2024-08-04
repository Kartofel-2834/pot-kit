<template>
    <component
        :is="tag"
        :class="[$style.PotButton, classList]"
    >
        <slot />

        {{ properties }}
    </component>
</template>

<script setup>
// Vue
import { computed, useCssModule } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';

// Props
const $props = defineProps({
    tag: {
        type: String,
        default: 'button',
    },

    size: {
        type: String,
        default: '32',
        validator: value => {
            const sizes = ['32', '48', '56', 'none'];
            const newValue = value?.split(' ');

            return !newValue?.find(breakpoint => !sizes.includes(breakpoint));
        },
    },

    color: {
        type: String,
        default: 'red',
    },

    breakpoints: {
        type: String,
        default: 'desktop tablet mobile',
    },
});

const $style = useCssModule();

// Computed
const breakpointsList = computed(() => ($props.breakpoints?.split(' ') || []).filter(Boolean));
const sizesList = computed(() => ($props.size?.split(' ') || []).filter(Boolean));
const colorsList = computed(() => ($props.color?.split(' ') || []).filter(Boolean));

const properties = computed(() => {
    return useDeviceProperties({
        properties: {
            size: sizesList.value,
            color: colorsList.value,
        },

        devices: breakpointsList.value,
    });
});

const classList = computed(() => ({
    [$style[`_size-${properties.value.value.size}`]]: properties.value?.value?.size,
    [$style[`_color-${properties.value.value.color}`]]: properties.value?.value?.color,
}));
</script>

<style lang="scss" module>
.PotButton {
    background-color: $soup-pot;
    color: $base-0;
    transition: $default-transition;
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
