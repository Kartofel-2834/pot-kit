<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED, useDeviceIs } from '@/composables/device-is';
import { POT_RADIO_DEFAULTS } from '@/constants/defaults';

const $propsDefaults = {
    tag: 'div',
    devices: () => ALL_DEVICES_REVERSED,
};

const $configDefaults = usePropsDefaults(POT_RADIO_DEFAULTS);
</script>

<script lang="ts" setup>
// Types
import type { IPotRadioProps } from '@/types/components';
import type { TPropsDefaults } from '@/types';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

const $props = withDefaults(defineProps<IPotRadioProps>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotRadioProps>);

const $deviceIs = useDeviceIs();

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
        $deviceIs.device.value,
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value,
        active: $props.active,
        disabled: $props.disabled,
        invalid: $props.invalid,
    }),
);
</script>

<template>
    <component
        :is="tag"
        :class="['pot-radio', classList]"
    >
        <span class="pot-radio__marker" />

        <slot />
    </component>
</template>

<style src="@/assets/css/base/pot-radio.css" />
<style src="@/assets/css/configuration/pot-radio.css" />
<style src="@/assets/css/preset/pot-radio.css" />
