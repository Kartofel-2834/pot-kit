<template>
    <component
        :is="tag"
        :class="['pot-grid', classList]"
        :style="currentStyles"
    >
        <slot
            :gap="properties.gap"
            :size="properties.size"
            :devices="devices"
        />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotGridProps } from '@/types/components';
import type { TDeviceIs } from '@/types/composables';

// Enums
import { POT_GAP } from '@/enums/components/EPotGap';
import { POT_SIZE } from '@/enums/preset';

// Vue
import { computed, inject } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';
import { useClassList } from '@/composables/class-list';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGridProps>(), {
    tag: 'div',
    gap: POT_GAP.MEDIUM,
    size: POT_SIZE.MEDIUM,
    cols: undefined,
    rows: undefined,
    flow: undefined,
    autoRows: undefined,
    autoCols: undefined,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = inject<TDeviceIs>('deviceIs');

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            cols: $props.cols,
            rows: $props.rows,
            flow: $props.flow,
            autoCols: $props.autoCols,
            autoRows: $props.autoRows,
            gap: $props.gap,
            size: $props.size,
        },
        $props.devices,
        $deviceIs?.device?.value,
    );
});

const classList = computed(() =>
    useClassList({
        gap: typeof properties.value.gap === 'string' ? properties.value.gap : null,
    }),
);

const currentStyles = computed(() => {
    const gap = typeof properties.value.gap === 'number' ? `${properties.value.gap}px` : null;

    return {
        '--pot-grid-gap': gap,
        '--pot-grid-columns': formatNumberToFr(properties.value.cols),
        '--pot-grid-rows': formatNumberToFr(properties.value.rows),
        '--pot-grid-flow': properties.value.flow,
        '--pot-grid-auto-row': properties.value.autoRows,
        '--pot-grid-auto-col': properties.value.autoCols,
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

<style lang="scss">
.pot-grid {
    display: grid;
    grid-template-columns: var(--pot-grid-columns);
    grid-template-rows: var(--pot-grid-rows);
    grid-auto-flow: var(--pot-grid-flow);
    grid-auto-rows: var(--pot-grid-auto-row);
    grid-auto-columns: var(--pot-grid-auto-col);
    gap: var(--pot-grid-gap);

    /* --- Gap --- */
    @include gap();
}
</style>
