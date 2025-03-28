<template>
    <component
        :is="tag"
        :style="currentStyles"
        class="pot-group-item"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotGroupItemProps } from '@/types/components/pot-group-item-types';

// Vue
import { computed } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGroupItemProps>(), {
    tag: 'div',
    order: undefined,
    grow: undefined,
    shrink: undefined,
    basis: undefined,
    justify: undefined,
    align: undefined,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = useDeviceIs();

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            order: $props.order,
            grow: $props.grow,
            shrink: $props.shrink,
            basis: $props.basis,
            align: $props.align,
            justify: $props.justify,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

const currentStyles = computed(() => {
    return {
        '--pot-group-item-order': properties.value.order,
        '--pot-group-item-grow': properties.value.grow,
        '--pot-group-item-shrink': properties.value.shrink,
        '--pot-group-item-basis': properties.value.basis,
        '--pot-group-item-justify': properties.value.justify,
        '--pot-group-item-align': properties.value.align,
    };
});
</script>

<style>
.pot-group-item {
    order: var(--pot-group-item-order);
    flex-grow: var(--pot-group-item-grow);
    flex-shrink: var(--pot-group-item-shrink);
    flex-basis: var(--pot-group-item-basis);
    align-self: var(--pot-group-item-align);
    justify-self: var(--pot-group-item-justify);
}
</style>
