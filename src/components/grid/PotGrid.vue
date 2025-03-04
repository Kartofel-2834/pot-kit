<template>
    <component
        :is="tag"
        :class="['pot-grid', classList]"
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
import { ALL_DEVICES_REVERSED, useDeviceIs } from '@/composables/device-is';

// TODO: доработать систему типов для строковых значений
const $props = withDefaults(defineProps<IPotGridProps>(), {
    tag: 'div',
    gap: null,
    cols: undefined,
    rows: undefined,
    flow: undefined,
    autoRows: undefined,
    autoCols: undefined,
    align: undefined,
    alignContent: undefined,
    justify: undefined,
    justifyItems: undefined,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = useDeviceIs();

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            cols: $props.cols,
            rows: $props.rows,
            flow: $props.flow,
            autoCols: $props.autoCols,
            autoRows: $props.autoRows,
            align: $props.align,
            alignContent: $props.alignContent,
            justify: $props.justify,
            justifyItems: $props.justifyItems,
            gap: $props.gap,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

const classList = computed(() => useClassList({ ...properties.value }));

const currentStyles = computed(() => {
    return {
        '--pot-grid-columns': formatNumberToFr(properties.value.cols),
        '--pot-grid-rows': formatNumberToFr(properties.value.rows),
        '--pot-grid-flow': properties.value.flow,
        '--pot-grid-auto-row': properties.value.autoRows,
        '--pot-grid-auto-col': properties.value.autoCols,
        '--pot-grid-align': properties.value.align,
        '--pot-grid-align-content': properties.value.alignContent,
        '--pot-grid-justify': properties.value.justify,
        '--pot-grid-justify-items': properties.value.justifyItems,
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

<style>
.pot-grid {
    display: grid;
    grid-template-columns: var(--pot-grid-columns);
    grid-template-rows: var(--pot-grid-rows);
    grid-auto-flow: var(--pot-grid-flow);
    grid-auto-rows: var(--pot-grid-auto-row);
    grid-auto-columns: var(--pot-grid-auto-col);
    align-items: var(--pot-grid-align);
    align-content: var(--pot-grid-align-content);
    justify-content: var(--pot-grid-justify);
    justify-items: var(--pot-grid-justify-items);

    /* Gap */
    gap: var(--gap);
}
</style>
