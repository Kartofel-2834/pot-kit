<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_GRID_DEFAULTS } from '@/constants/defaults';

const $propsDefaults = {
    tag: 'div',
    devices: () => ALL_DEVICES_REVERSED,
};

const $configDefaults = usePropsDefaults(POT_GRID_DEFAULTS);
</script>

<script lang="ts" setup>
// Types
import type { IPotGridProps } from '@/types/components';
import type { TPropsDefaults } from '@/types';

// Vue
import { computed } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';
import { useClassList } from '@/composables/class-list';
import { useDeviceIs } from '@/composables/device-is';

// TODO: доработать систему типов для строковых значений
const $props = withDefaults(defineProps<IPotGridProps>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotGridProps>);

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
            rowGap: $props.rowGap,
            columnGap: $props.columnGap,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

const classList = computed(() =>
    useClassList({
        gap: properties.value.gap,
        'row-gap': properties.value.rowGap,
        'column-gap': properties.value.columnGap,
        'divided-gap': Boolean(properties.value.rowGap || properties.value.columnGap),
    }),
);

const currentStyles = computed(() => {
    return {
        display: 'grid',
        gridTemplateColumns: formatNumberToFr(properties.value.cols),
        gridTemplateRows: formatNumberToFr(properties.value.rows),
        gridAutoFlow: properties.value.flow,
        gridAutoRows: properties.value.autoRows,
        gridAutoColumns: properties.value.autoCols,
        alignItems: properties.value.align,
        alignContent: properties.value.alignContent,
        justifyContent: properties.value.justify,
        justifyItems: properties.value.justifyItems,
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

<template>
    <component
        :is="$props.tag"
        :class="['pot-grid', classList]"
        :style="currentStyles"
    >
        <slot />
    </component>
</template>

<style src="@/assets/css/preset/pot-grid.css" />
