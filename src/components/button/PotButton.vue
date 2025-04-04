<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_BUTTON_DEFAULTS } from '@/constants/defaults';

const $propsDefaults = {
    tag: 'button',
    radius: 'circle',
    size: null,
    color: null,
    devices: () => ALL_DEVICES_REVERSED,
    icon: '',
    preicon: '',
    square: false,
    disabled: false,
};

const $configDefaults = usePropsDefaults(POT_BUTTON_DEFAULTS);
</script>

<script lang="ts" setup>
// Types
import type { IPotButtonProps } from '@/types/components';
import type { TPropsDefaults } from '@/types';

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotButtonProps>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotButtonProps>);

const $deviceIs = useDeviceIs();

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties(
        {
            color: $props.color,
            size: $props.size,
            radius: $props.radius,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value,
        square: $props.square,
    }),
);
</script>

<template>
    <component
        :is="$props.tag"
        :class="['pot-button', classList]"
        :disabled="$props.disabled"
    >
        <slot name="preicon">
            <PotIcon
                v-if="$props.preicon"
                :icon="$props.preicon"
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
                v-if="$props.icon"
                :icon="$props.icon"
                class="pot-button__icon pot-button__icon_post"
            />
        </slot>
    </component>
</template>

<style src="@/assets/css/preset/pot-button.css" />
