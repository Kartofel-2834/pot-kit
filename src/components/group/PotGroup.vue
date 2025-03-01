<template>
    <component
        :is="tag"
        :class="['pot-group', classList]"
    >
    </component>
</template>

<script lang="ts" setup>
// Types
import type { TDeviceIs } from '@/types/composables';
import type { EPotDevice, EPotSize } from '@/enums/preset';
import type { EPotGap } from '@/enums/components';

// Vue
import { computed, inject } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

type TPotGroupDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

interface IPotGroupProps {
    tag?: string;
    direction?: TPotGroupDirection | TPotGroupDirection[];
    size?: EPotSize;

    /** Размер отступов сетки */
    gap?: EPotGap | EPotGap[] | number | number[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EPotDevice[];
}

const $props = withDefaults(defineProps<IPotGroupProps>(), {
    tag: 'div',
});

const $deviceIs = inject<TDeviceIs>('deviceIs');

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            gap: $props.gap,
            direction: $props.direction,
            size: $props.size,
        },
        $props.devices,
        $deviceIs?.device?.value,
    );
});

const classList = computed(() =>
    useClassList({
        gap: typeof properties.value.gap === 'string' ? properties.value.gap : null,
        direction: properties.value.direction,
    }),
);
</script>

<style lang="scss">
.pot-group {
}
</style>
