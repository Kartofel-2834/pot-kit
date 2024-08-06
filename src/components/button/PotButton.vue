<template>
    <component
        :is="tag"
        :class="[$style.PotButton, 'pot-button', classList]"
    >
        <slot name="preicon"> preicon </slot>

        <span
            v-if="$slots?.default"
            :class="[$style.label, 'pot-button__label']"
        >
            <slot />
        </span>

        <slot name="icon"> icon </slot>
    </component>
</template>

<script lang="ts" setup>
// Vue
import { withDefaults, computed, useCssModule } from 'vue';

// Types
import type { IPotButtonProps } from '@/types/components/pot-button-types';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Props
const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    size: '32',
    color: 'clay',
    radius: '6',
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
            radius: $props.radius,
        },
    });
});

const classList = computed(() =>
    useClassList({
        ...properties.value.value,
    }),
);
</script>

<style lang="scss" module>
.PotButton {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1;
    outline: none;
    cursor: pointer;
    user-select: none;
    transition: background-color $default-transition;

    /* --- Sizes --- */
    @include modificator(size, 32) {
        height: 3.2rem;
        padding: 0 1rem;
        font-size: 1.4rem;
    }

    @include modificator(size, 48) {
        height: 4.8rem;
        padding: 0 1.8rem;
    }

    @include modificator(size, 56) {
        height: 5.6rem;
        padding: 0 1.8rem;
    }

    /* --- Colors --- */
    @include modificator(color, clay) {
        background-color: $clay-pot-100;
        color: $base-0;

        &:not(:active) {
            &:hover {
                background-color: $clay-pot-0;
            }
        }
    }

    /* --- Border radius --- */
    @include modificator(radius, 4) {
        border-radius: 0.4rem;
    }

    @include modificator(radius, 6) {
        border-radius: 0.6rem;
    }

    @include modificator(radius, 8) {
        border-radius: 0.8rem;
    }

    @include modificator(radius, 100) {
        border-radius: 100rem;
    }

    .label {
        padding: 0 1.4rem;
    }
}
</style>
