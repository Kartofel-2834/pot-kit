<template>
    <component
        :is="tag"
        :class="[$style.PotButton, 'pot-button', classList]"
    >
        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :class="$style.icon"
                :icon="preicon"
            />
        </slot>

        <span
            v-if="$slots?.default"
            :class="[$style.label, 'pot-button__label']"
        >
            <slot />
        </span>

        <slot name="icon">
            <PotIcon
                v-if="icon"
                :class="$style.icon"
                :icon="icon"
            />
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotButtonProps } from '@/types/components/pot-button-types';

// Vue
import { withDefaults, defineAsyncComponent, computed, useCssModule } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

// Props
const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    size: '32',
    color: 'clay',
    radius: '6',
    breakpoints: 'desktop tablet mobile',
    icon: '',
    preicon: '',
    square: false,
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
        square: $props.square,
    }),
);
</script>

<style lang="scss" module>
.PotButton {
    display: flex;
    align-items: center;
    justify-content: center;
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

        @include modificator(square) {
            padding: 0;
        }
    }

    @include modificator(size, 48) {
        height: 4.8rem;
        padding: 0 1.8rem;

        @include modificator(square) {
            padding: 0;
        }
    }

    @include modificator(size, 56) {
        height: 5.6rem;
        padding: 0 1.8rem;

        @include modificator(square) {
            padding: 0;
        }
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

    /* --- Flags --- */
    @include modificator(square) {
        aspect-ratio: 1 / 1;
    }

    .label {
        padding: 0 1.4rem;
    }

    .icon {
        flex-shrink: 0;
        width: 1.4em;
        height: 1.4em;
    }
}
</style>
