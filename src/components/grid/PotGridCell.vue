<template>
    <component
        :is="tag"
        :class="[$style.PotGridCell, 'pot-grid-cell']"
        :style="currentStyles"
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

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGridCell>(), {
    tag: 'div',
    col: undefined,
    row: undefined,
    devices: () => ALL_DEVICES_REVERSED,
});

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            col: $props.col,
            row: $props.row,
        },
        $props.devices,
    );
});

const currentStyles = computed(() => {
    return {
        '--pot-grid-cell-col': properties.value.value.col,
        '--pot-grid-cell-row': properties.value.value.row,
    };
});
</script>

<style lang="scss" module>
.PotGridCell {
    grid-column: var(--pot-grid-cell-col);
    grid-row: var(--pot-grid-cell-row);
}
</style>
