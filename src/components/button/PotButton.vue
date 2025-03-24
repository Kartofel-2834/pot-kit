<template>
    <component
        :is="$potProps.tag"
        :class="['pot-button', classList]"
        :disabled="$potProps.disabled"
    >
        <slot name="preicon">
            <PotIcon
                v-if="$potProps.preicon"
                :icon="$potProps.preicon"
                class="pot-button__icon pot-button__icon_pre"
            />
        </slot>

        <span
            v-if="$slots?.default"
            class="pot-button__label"
        >
            <slot />
        </span>

        <slot name="icon">
            <PotIcon
                v-if="$potProps.icon"
                :icon="$potProps.icon"
                class="pot-button__icon pot-button__icon_post"
            />
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotKitPluginOptions } from '@/types/plugins';
import type { IPotButtonProps } from '@/types/components';

// Vue
import { defineAsyncComponent, computed, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED, useDeviceIs } from '@/composables/device-is';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $config = inject<IPotKitPluginOptions>('pot-config', {});

const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    radius: 'circle',
    size: null,
    color: null,
    devices: () => ALL_DEVICES_REVERSED,
    icon: '',
    preicon: '',
    square: false,
    disabled: false,
    unstyled: false,
});

const $deviceIs = useDeviceIs();

const $potProps = computed<typeof $props>(() => ({
    ...$props,
    ...($config.button || {}),
}));

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties(
        {
            color: $potProps.value.color,
            size: $potProps.value.size,
            radius: $potProps.value.radius,
        },
        $potProps.value.devices,
        $deviceIs.device.value,
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value,
        square: $potProps.value.square,
    }),
);
</script>

<style src="@/assets/css/base/pot-button.css" />
<style src="@/assets/css/configuration/pot-button.css" />
<style src="@/assets/css/preset/pot-button.css" />
