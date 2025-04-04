<script lang="ts" setup>
// Types
import type { IPotGridCell } from '@/types/components';

// Vue
import { computed } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGridCell>(), {
    tag: 'div',
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = useDeviceIs();

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            col: $props.col,
            row: $props.row,
            align: $props.align,
            justify: $props.justify,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

const currentStyles = computed(() => {
    return {
        gridColumn: properties.value.col,
        gridRow: properties.value.row,
        alignSelf: properties.value.align,
        justifySelf: properties.value.justify,
    };
});
</script>

<template>
    <component
        :is="tag"
        :style="currentStyles"
        class="pot-grid-cell"
    >
        <slot />
    </component>
</template>
