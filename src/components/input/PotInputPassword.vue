<template>
    <PotInputBase
        :class="[$style.PotInputPassword, 'pot-input-password', classList]"
        :model-value="modelValue"
        :value="value"
        :devices="devices"
        :size="size"
        :color="color"
        :icon="icon"
        :preicon="preicon"
        :disabled="disabled"
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
                    :class="[$style.icon, 'pot-input-password__eye']"
                    :icon="toggleIcon"
                    @click="onTypeToggle"
                />
            </slot>
        </template>

        <template #prepend>
            <slot name="prepend" />
        </template>
    </PotInputBase>
</template>

<script setup lang="ts">
// Types
import type { IPotInputPasswordProps } from '@/types/components';

// Vue
import { ref, defineAsyncComponent, computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';

// Components
import PotInputBase from '@/components/input/PotInputBase.vue';

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

<style lang="scss" module>
.PotInputPassword {
    /* --- Colors - START --- */
    .icon {
        color: var(--pot-input-icon-color);
    }

    @include modificator(type, 'text') {
        .icon {
            color: var(--pot-input-focused-icon-color);
        }
    }
    /* --- Colors - END --- */
}

.icon {
    width: 1.4em;
    font-size: inherit;
    cursor: pointer;
    transition: var(--pot-transition);
}
</style>
