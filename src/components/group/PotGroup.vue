<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_GROUP_DEFAULTS } from '@/constants/defaults';

const $propsDefaults = {
    tag: 'div',
    devices: () => ALL_DEVICES_REVERSED,
};

const $configDefaults = usePropsDefaults(POT_GROUP_DEFAULTS);
</script>

<script lang="ts" setup>
// Types
import type { IPotGroupProps } from '@/types/components';
import type { TPropsDefaults } from '@/types';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useDeviceIs } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotGroupProps>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotGroupProps>);

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
        display: 'flex',
        flexDirection: properties.value.direction,
        alignItems: properties.value.align,
        alignContent: properties.value.alignContent,
        justifyContent: properties.value.justify,
        justifyItems: properties.value.justifyItems,
        flexWrap: properties.value.wrap,
    };
});
</script>

<template>
    <component
        :is="tag"
        :class="['pot-group', classList]"
        :style="currentStyles"
    >
        <slot />
    </component>
</template>

<style src="@/assets/css/preset/pot-group.css" />
