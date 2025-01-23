<template>
    <PotCheckbox
        :value="value"
        :model-value="modelValue"
        :class="[$style.PotSwitch, 'pot-switch', classList]"
        :style="{ '--width': `${targetWidth}px` }"
        :size="size"
        :color="color"
        :radius="radius"
        :true-value="trueValue"
        :false-value="falseValue"
        :disabled="disabled"
        @change="$emit('change', $event)"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template #content>
            <div
                v-resize
                :class="[$style.wrapper, 'pot-switch__wrapper']"
            >
                <span :class="[$style.ball, 'pot-switch__wrapper__ball']">
                    <slot> </slot>
                </span>
            </div>
        </template>
    </PotCheckbox>
</template>

<script lang="ts" setup>
// Types
import type { IPotSwitchProps } from '@/types/components/pot-switch-types';
import type { TCheckboxValue } from '@/types/components';

// Enums
import { ESize, ERadius } from '@/enums/components';
import { EIcon, EColorTheme } from '@/enums/config';

// Vue
import { ref, computed } from 'vue';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Composables
import { useResize } from '@/composables/resize';
import { useClassList } from '@/composables/class-list';

// Components
import PotCheckbox from '@/components/check/PotCheckbox.vue';

withDefaults(defineProps<IPotSwitchProps>(), {
    value: null,
    modelValue: null,
    disabled: false,
    trueValue: true,
    falseValue: false,
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
    radius: ERadius.MEDIUM,
    devices: () => ALL_DEVICES_REVERSED,
});

const $emit = defineEmits<{
    change: [newValue: TCheckboxValue];
    'update:modelValue': [newValue: TCheckboxValue];
}>();

// Model
const isResizeStarted = ref<boolean>(false);
const targetWidth = ref<number>(0);

// Directives
const vResize = useResize({
    onStart() {
        isResizeStarted.value = true;
    },

    onEnd(rect) {
        targetWidth.value = Math.floor(rect.width || 0);
    },
});

// Computed
const classList = computed(() =>
    useClassList({
        resizeStarted: isResizeStarted.value,
    }),
);
</script>

<style lang="scss" module>
.PotSwitch {
    width: 100%;

    /* --- Colors - START --- */
    .wrapper {
        background-color: var(--pot-theme-target-subcolor);
    }

    .ball {
        background-color: var(--pot-base-0);
    }

    @include modificator(checked) {
        .wrapper {
            background-color: var(--pot-theme-target-color);
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    @include modificator(size, tiny) {
        min-width: calc(var(--pot-size-tiny) * 2);

        .wrapper {
            padding: 0 calc(var(--pot-spacer) / 4);
            height: var(--pot-size-tiny);
        }

        .ball {
            height: calc(100% - var(--pot-unit));
        }
    }

    @include modificator(size, small) {
        min-width: calc(var(--pot-size-small) * 2);

        .wrapper {
            padding: 0 calc(var(--pot-spacer) / 2);
            height: var(--pot-size-small);
        }

        .ball {
            height: calc(100% - var(--pot-spacer));
        }
    }

    @include modificator(size, medium) {
        min-width: calc(var(--pot-size-medium) * 2);

        .wrapper {
            padding: 0 var(--pot-unit);
            height: var(--pot-size-medium);
        }

        .ball {
            height: calc(100% - var(--pot-unit));
        }
    }

    @include modificator(size, big) {
        min-width: calc(var(--pot-size-big) * 2);

        .wrapper {
            padding: 0 var(--pot-unit);
            height: var(--pot-size-big);
        }

        .ball {
            height: calc(100% - var(--pot-unit));
        }
    }

    @include modificator(size, large) {
        min-width: calc(var(--pot-size-large) * 2);

        .wrapper {
            padding: 0 var(--pot-unit);
            height: var(--pot-size-large);
        }

        .ball {
            height: calc(100% - var(--pot-unit));
        }
    }

    /* --- Active --- */
    @include modificator(checked) {
        .ball {
            transform: translateX(calc(var(--width) - 100%));
        }
    }
}

.wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: var(--pot-radius-circle);
    transition: background-color var(--pot-transition);
}

.ball {
    aspect-ratio: 1 / 1;
    border-radius: inherit;
    transition: transform var(--pot-transition);
}
</style>
