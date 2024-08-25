<template>
    <component
        :is="tag"
        :class="[$style.PotRadio, 'pot-radio']"
    >
        <template v-for="spec of specs">
            <slot name="radio">
                <component
                    :is="radioTag"
                    :key="`PotRadioSpec_${specsHelper.getSpecValue(spec)}`"
                    :class="[$style.spec, specsHelper.getSpecClassList(spec)]"
                    @click="onSpecClick(spec)"
                >
                    {{ specsHelper.getSpecLabel(spec) }}
                </component>
            </slot>
        </template>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotRadioProps } from '@/types/components/pot-radio-types';
import type { Spec, SpecValue } from '@/types/composables/specs-helper-types';

// Vue
import { computed } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';

const $props = withDefaults(defineProps<IPotRadioProps>(), {
    tag: 'ul',
    radioTag: 'li',
    specs: () => [],
    facets: null,
    value: null,
    modelValue: null,
    valueName: 'value',
    labelName: 'label',
});

const $emit = defineEmits<{
    change: [value: SpecValue];
    'update:modelValue': [value: SpecValue];
}>();

const specsHelper = computed(() => useSpecsHelper($props));

// Methods
function onSpecClick(spec: Spec): void {
    if (specsHelper.value.checkIsDisabled(spec)) return;

    const newValue: SpecValue = specsHelper.value.getSpecValue(spec);

    $emit('change', newValue);
    $emit('update:modelValue', newValue);
}
</script>

<style lang="scss" module>
.PotRadio {
    //
}
</style>
