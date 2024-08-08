<template>
    <ul :class="[$style.PotRadio, 'pot-radio']">
        <li
            v-for="spec of specs"
            :key="`PotRadioSpec_${specsHelper.getSpecValue(spec)}`"
            :class="[$style.spec, specsHelper.getSpecClassList(spec)]"
            @click="onSpecClick(spec)"
        >
            {{ specsHelper.getSpecLabel(spec) }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
// TODO: add docstrings

// Types
import type { IPotRadioProps } from '@/types/components/pot-radio-types';
import type { Spec, SpecValue } from '@/types/composables/specs-helper-types';

// Vue
import { computed } from 'vue';

// Composables
import { useSpecsHelper } from '@/composables/specs-helper';

const $props = withDefaults(defineProps<IPotRadioProps>(), {
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
