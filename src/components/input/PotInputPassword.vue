<script setup lang="ts">
// Types
import type { IPotInputPasswordProps } from '@/types/components';

// Vue
import { ref, defineAsyncComponent, computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';

// Components
const PotInputBase = defineAsyncComponent(() => import('@/components/input/PotInputBase.vue'));
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

withDefaults(defineProps<IPotInputPasswordProps>(), {
    toggleIcon: 'eye',
});

const $emit = defineEmits<{
    input: [value: string];
    change: [value: string];
    'update:modelValue': [value: string];
}>();

const inputType = ref<'text' | 'password'>('password');

// Computed
const classList = computed(() =>
    useClassList({
        type: inputType.value,
    }),
);

// Methods
function onTypeToggle(event: Event) {
    event.preventDefault();
    inputType.value = inputType.value === 'text' ? 'password' : 'text';
}
</script>

<template>
    <PotInputBase
        :class="['pot-input-password', classList]"
        :model-value="modelValue"
        :value="value"
        :devices="devices"
        :size="size"
        :color="color"
        :radius="radius"
        :icon="icon"
        :preicon="preicon"
        :disabled="disabled"
        :invalid="invalid"
        :parser="parser"
        :formatter="formatter"
        :type="inputType"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template
            v-if="$slots.preicon"
            #preicon
        >
            <slot name="preicon" />
        </template>

        <template
            v-if="$slots.icon"
            #icon
        >
            <slot name="icon" />
        </template>

        <template #append>
            <slot name="eye">
                <PotIcon
                    :icon="toggleIcon"
                    class="pot-input-password__toggle-icon"
                    @click="onTypeToggle"
                />
            </slot>
        </template>

        <template #prepend>
            <slot name="prepend" />
        </template>
    </PotInputBase>
</template>

<style>
.pot-input-password .pot-input-password__toggle-icon {
    /* Color */
    color: var(--input-color-icon);
}

/* --- PotInput - Type - Text --- */
.pot-input-password._type-text .pot-input-password__toggle-icon {
    /* Color */
    color: var(--input-color-focused-border);
}

/* --- PotInput - Invalid --- */
.pot-input-password._invalid._type-text .pot-input-password__toggle-icon {
    /* Color */
    color: var(--pot-color-invalid);
}

/* ----------------------------------------------------------- */

.pot-input-password__toggle-icon {
    width: 1.4em;
    font-size: inherit;
    cursor: pointer;
    transition: color var(--pot-transition);
}
</style>
