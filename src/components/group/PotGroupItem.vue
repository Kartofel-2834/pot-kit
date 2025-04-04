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
        order: properties.value.order,
        flexGrow: properties.value.grow,
        flexShrink: properties.value.shrink,
        flexBasis: properties.value.basis,
        alignSelf: properties.value.align,
        justifySelf: properties.value.justify,
    };
});
</script>

<template>
    <component
        :is="tag"
        :style="currentStyles"
        class="pot-group-item"
    >
        <slot />
    </component>
</template>
