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
import type { TDeviceIs } from '@/types/composables';

// Vue
import { computed, inject } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGridCell>(), {
    tag: 'div',
    col: undefined,
    row: undefined,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = inject<TDeviceIs>('deviceIs');

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            col: $props.col,
            row: $props.row,
        },
        $props.devices,
        $deviceIs?.device?.value,
    );
});

const currentStyles = computed(() => {
    return {
        '--pot-grid-cell-col': properties.value.col,
        '--pot-grid-cell-row': properties.value.row,
    };
});
</script>

<style lang="scss">
.pot-grid-cell {
    grid-column: var(--pot-grid-cell-col);
    grid-row: var(--pot-grid-cell-row);
}
</style>
