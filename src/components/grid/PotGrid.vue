<template>
    <component
        :is="tag"
        :class="[$style.PotGrid, 'pot-grid', classList]"
        :style="currentStyles"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotGridProps } from '@/types/components';

// Vue
import { computed } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';
import { useClassList } from '@/composables/class-list';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGridProps>(), {
    tag: 'div',
    cols: undefined,
    rows: undefined,
    flow: undefined,
    autoRows: undefined,
    autoCols: undefined,
    size: null,
    devices: () => ALL_DEVICES_REVERSED,
});

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            cols: $props.cols,
            rows: $props.rows,
            flow: $props.flow,
            autoCols: $props.autoCols,
            autoRows: $props.autoRows,
            size: $props.size,
        },
        $props.devices,
    );
});

const classList = computed(() =>
    useClassList({
        size: properties.value.value.size,
    }),
);

const currentStyles = computed(() => {
    return {
        '--pot-grid-columns': formatNumberToFr(properties.value.value.cols),
        '--pot-grid-rows': formatNumberToFr(properties.value.value.rows),
        '--pot-grid-flow': properties.value.value.flow,
        '--pot-grid-auto-row': properties.value.value.autoRows,
        '--pot-grid-auto-col': properties.value.value.autoCols,
    };
});

// Methods
function formatNumberToFr(v?: string | number): string | undefined {
    if (['number', 'string'].includes(typeof v) && !isNaN(Number(v))) {
        return `repeat(${v}, 1fr)`;
    }

    return v ? String(v) : undefined;
}
</script>

<style lang="scss" module>
.PotGrid {
    display: grid;
    grid-template-columns: var(--pot-grid-columns);
    grid-template-rows: var(--pot-grid-rows);
    grid-auto-flow: var(--pot-grid-flow);
    grid-auto-rows: var(--pot-grid-auto-row);
    grid-auto-columns: var(--pot-grid-auto-col);

    /* --- Sizes --- */
    $standard-size: (
        gap: var(--pot-spacer-1-600),
    );

    @include size($standard-size, down) using ($size, $size-name) {
        gap: map-get($size, 'gap');
    }
}
</style>
