<template>
    <PotInputBase
        :model-value="modelValue"
        :value="value"
        :devices="devices"
        :size="size"
        :color="color"
        :icon="icon"
        :radius="radius"
        :preicon="preicon"
        :disabled="disabled"
        :invalid="invalid"
        :parser="parser"
        :formatter="formatter"
        class="pot-input-masked"
        @keydown="onKeyDown"
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

        <template #prepend>
            <slot name="prepend" />
        </template>

        <template #append>
            <slot name="append" />
        </template>
    </PotInputBase>
</template>

<script lang="ts" setup>
// Types
import type { IPotInputMaskedProps } from '@/types/components';
import type { TMaskPlaceholder } from '@/types/composables';

// Vue
import { computed } from 'vue';

// Composables
import { useMask, removeMask, defaultPlaceholders } from '@/composables/mask';

// Components
import PotInputBase from '@/components/input/PotInputBase.vue';

const $props = defineProps<IPotInputMaskedProps>();

const $emit = defineEmits<{
    input: [value: string];
    change: [value: string];
    'update:modelValue': [value: string];
}>();

// Computed
const maskPlaceholders = computed<Record<string, TMaskPlaceholder>>(() => ({
    ...defaultPlaceholders,
    ...$props.maskPlaceholders,
}));

const maskPlaceholdersRegex = computed(() => {
    return new RegExp(
        Object.keys(maskPlaceholders.value)
            .map(v => `\\${v}`)
            .join('|'),
        'gm',
    );
});

// Methods
function onKeyDown(event: KeyboardEvent) {
    if (!$props.mask || event.key !== 'Backspace') {
        return;
    }

    const target = event.target as HTMLInputElement;
    const selectedText = $props.mask.substring(
        target.selectionStart || 0,
        target.selectionEnd || 0,
    );

    const hasPlaceholderInSelection = maskPlaceholdersRegex.value.test(selectedText);

    // Если в выборке на удаление есть фактические значения,
    // а не части маски, то позволяем удалить их
    if (hasPlaceholderInSelection) {
        return;
    }

    // Удаляем последний символ значения с конца
    event.preventDefault();
    let currentValue = parser(target.value);

    if (!currentValue) {
        return;
    }

    currentValue = currentValue.slice(0, -1);

    $emit('update:modelValue', currentValue);
    $emit('input', currentValue);
}

function formatter(value: string): string {
    const striginfiedValue =
        typeof value === 'string' || typeof value === 'number' ? String(value) : '';

    if (!$props.mask) {
        return striginfiedValue;
    }

    return useMask(striginfiedValue, $props.mask, $props.maskPlaceholders);
}

function parser(value: string): string {
    if (!$props.mask) {
        return value;
    }

    return removeMask(value, $props.mask, $props.maskPlaceholders);
}
</script>
