<template>
    <component
        :is="tag"
        :class="['pot-group', classList]"
        :style="currentStyles"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotGroupProps } from '@/types/components';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGroupProps>(), {
    tag: 'div',
    align: undefined,
    alignContent: undefined,
    justify: undefined,
    justifyItems: undefined,
    direction: undefined,
    wrap: undefined,
    gap: undefined,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = useDeviceIs();

// Computed
const properties = computed(() => {
    return useDeviceProperties(
        {
            gap: $props.gap,
            direction: $props.direction,
            align: $props.align,
            alignContent: $props.alignContent,
            justify: $props.justify,
            justifyItems: $props.justifyItems,
            wrap: $props.wrap,
        },
        $props.devices,
        $deviceIs.device.value,
    );
});

const classList = computed(() =>
    useClassList({
        gap: properties.value.gap,
    }),
);

const currentStyles = computed(() => {
    return {
        '--pot-group-direction': properties.value.direction,
        '--pot-group-align': properties.value.align,
        '--pot-group-align-content': properties.value.alignContent,
        '--pot-group-justify': properties.value.justify,
        '--pot-group-justify-items': properties.value.justifyItems,
        '--pot-group-wrap': properties.value.wrap,
    };
});
</script>

<style lang="scss">
.pot-group {
    display: flex;
    flex-direction: var(--pot-group-direction);
    align-items: var(--pot-group-align);
    align-content: var(--pot-group-align-content);
    justify-content: var(--pot-group-justify);
    justify-items: var(--pot-group-justify-items);
    flex-wrap: var(--pot-group-wrap);

    /* Gap */
    gap: var(--gap);
}
</style>
