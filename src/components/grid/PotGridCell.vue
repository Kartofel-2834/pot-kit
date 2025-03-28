<template>
    <component
        :is="tag"
        :style="currentStyles"
        class="pot-grid-cell"
    >
        <slot />
    </component>
</template>

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
    col: undefined,
    row: undefined,
    align: undefined,
    justify: undefined,
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
        '--pot-grid-cell-col': properties.value.col,
        '--pot-grid-cell-row': properties.value.row,
        '--pot-grid-cell-align': properties.value.align,
        '--pot-grid-cell-justify': properties.value.justify,
    };
});
</script>

<style lang="scss">
.pot-grid-cell {
    grid-column: var(--pot-grid-cell-col);
    grid-row: var(--pot-grid-cell-row);
    align-self: var(--pot-grid-cell-align);
    justify-self: var(--pot-grid-cell-justify);
}
</style>
