<script lang="ts" setup>
// Types
import type { IUiButtonProps } from '@/types/pot-kit/components/button';
import type { EUiDevice, EUiColor, EUiSize, EUiRadius } from '@/types/pot-kit/index';

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

// Components
const UiIcon = defineAsyncComponent(() => import('./UiIcon.vue'));

const $props = withDefaults(
    defineProps<IUiButtonProps<EUiDevice, EUiColor, EUiSize, EUiRadius>>(),
    {
        tag: 'button',
    },
);

const $deviceIs = useDeviceIs();

const properties = computed(() => {
    return useDeviceProperties(
        {
            color: $props.color,
            size: $props.size,
            radius: $props.radius,
        },
        $deviceIs.device.value,
        $props.devices,
    );
});

const classList = computed(() =>
    useClassList({
        ...properties.value,
        square: $props.square,
    }),
);
</script>

<template>
    <component
        :is="tag"
        :class="['ui-button', classList]"
        :disabled="disabled"
    >
        <slot name="preicon">
            <UiIcon
                v-if="preicon"
                :icon="preicon"
                class="ui-button__icon ui-button__icon_pre"
            />
        </slot>

        <span
            v-if="$slots?.default"
            class="ui-button__label"
        >
            <slot />
        </span>

        <slot name="icon">
            <UiIcon
                v-if="icon"
                :icon="icon"
                class="ui-button__icon ui-button__icon_post"
            />
        </slot>
    </component>
</template>

<style>
.ui-button {
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
        color 0.4s ease,
        border-color 0.4s ease,
        background-color 0.4s ease;
}

/* --- UiButton - Disabled --- */
.ui-button:disabled {
    cursor: not-allowed;
}

/* --- UiButton - Square --- */
.ui-button._square {
    padding: 0;
    aspect-ratio: 1 / 1;
}

.ui-button__icon {
    flex-shrink: 0;
}
</style>

<style src="@/assets/css/ui/button.css" />
