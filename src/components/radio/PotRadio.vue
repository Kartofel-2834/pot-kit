<template>
    <component
        :is="tag"
        :class="[$style.PotRadio, 'pot-radio', classList]"
    >
        <slot
            v-for="spec of updatedSpecs"
            name="radio"
            :spec="spec.target"
            :disabled="disabled || spec.isDisabled"
            :active="spec.isSelected"
            :on-change="() => onSpecClick(spec.value, spec.isDisabled)"
        >
            <PotRadioElement
                :key="`PotRadioElement_${spec.value}`"
                :tag="radioTag"
                :color="properties.color"
                :size="properties.size"
                :radius="properties.radius"
                :disabled="disabled || spec.isDisabled"
                :invalid="invalid"
                :active="spec.isSelected"
                @click="onSpecClick(spec.value, spec.isDisabled)"
            >
                {{ spec.label }}
            </PotRadioElement>
        </slot>
    </component>
</template>

<script lang="ts" generic="T extends TSpecValue, U extends TSpec = TSpecValue" setup>
// Types
import type { IPotRadioProps } from '@/types/components';
import type { TDeviceIs, TSpecValue, TSpec } from '@/types/composables';

// Enums
import { EColorTheme, ESize } from '@/enums/config';
import { ERadius } from '@/enums/components';

// Vue
import { computed, defineAsyncComponent, inject } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Components
const PotRadioElement = defineAsyncComponent(
    () => import('@/components/radio/PotRadioElement.vue'),
);

const $props = withDefaults(defineProps<IPotRadioProps<T, U>>(), {
    tag: 'ul',
    radioTag: 'li',
    value: null,
    modelValue: null,
    specs: () => [],
    devices: () => ALL_DEVICES_REVERSED,
    facets: null,
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
    radius: ERadius.CIRCLE,
    disabled: false,
    invalid: false,
});

const $emit = defineEmits<{
    change: [value: T];
    'update:modelValue': [value: T];
}>();

const $deviceIs = inject<TDeviceIs>('deviceIs');

// Computed
const specsHelper = computed(() => useSpecsHelper($props));

const updatedSpecs = computed(() => specsHelper.value.getModifiedSpecs());

const properties = computed(() => {
    return useDeviceProperties(
        {
            size: $props.size,
            radius: $props.radius,
            color: $props.color,
        },
        $props.devices,
        $deviceIs?.device?.value,
    );
});

const classList = computed(() =>
    useClassList({
        size: properties.value.size,
    }),
);

// Methods
function onSpecClick(specValue: T, isDisabled: boolean): void {
    if ($props.disabled || isDisabled) return;

    $emit('change', specValue);
    $emit('update:modelValue', specValue);
}
</script>

<style lang="scss" module>
.PotRadio {
    display: flex;
    gap: var(--pot-spacer-2);

    /* --- Sizes --- */
    $standard-size: (
        gap: var(--pot-radio-gap),
    );

    @include size($standard-size) using ($size, $size-name) {
        gap: map-get($size, 'gap');
    }
}
</style>
