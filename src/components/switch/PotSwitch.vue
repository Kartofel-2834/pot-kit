<template>
    <PotCheckbox
        :value="value"
        :model-value="modelValue"
        :class="[$style.PotSwitch, 'pot-switch', classList]"
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
            <div :class="[$style.wrapper, 'pot-switch__wrapper']">
                <div :class="[$style.line, 'pot-switch__wrapper__line']">
                    <div :class="[$style.ball, 'pot-switch__wrapper__line__ball']">
                        <slot> </slot>
                    </div>
                </div>
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
import { EColorTheme } from '@/enums/config';

// Vue
import { computed } from 'vue';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Composables
import { useClassList } from '@/composables/class-list';

// Components
import PotCheckbox from '@/components/check/PotCheckbox.vue';

const $props = withDefaults(defineProps<IPotSwitchProps>(), {
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

// Computed
const currentValue = computed<TCheckboxValue>(() => $props.value ?? $props.modelValue ?? null);

const isChecked = computed<boolean>(() => currentValue.value === $props.trueValue);

const classList = computed(() =>
    useClassList({
        'not-checked': !isChecked.value,
    }),
);
</script>

<style lang="scss" module>
.PotSwitch {
    /* --- Colors - START --- */
    .wrapper {
        background-color: var(--pot-theme-target-subcolor);
    }

    .ball {
        background-color: var(--pot-base-0);
    }

    .line {
        background-color: transparent;
    }

    @include modificator(checked) {
        .line {
            background-color: var(--pot-theme-target-color);
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    @include modificator(size, tiny) {
        min-width: calc(var(--pot-size-tiny) * 2);

        .wrapper {
            height: var(--pot-size-tiny);
        }

        .line {
            padding: calc(var(--pot-spacer) / 2.5);
            transform: translateX(calc(-100% + var(--pot-size-tiny)));
        }
    }

    @include modificator(size, small) {
        min-width: calc(var(--pot-size-small) * 2);

        .wrapper {
            height: var(--pot-size-small);
        }

        .line {
            padding: calc(var(--pot-spacer) / 2);
            transform: translateX(calc(-100% + var(--pot-size-small)));
        }
    }

    @include modificator(size, medium) {
        min-width: calc(var(--pot-size-medium) * 2);

        .wrapper {
            height: var(--pot-size-medium);
        }

        .line {
            padding: calc(var(--pot-spacer) / 2);
            transform: translateX(calc(-100% + var(--pot-size-medium)));
        }
    }

    @include modificator(size, big) {
        min-width: calc(var(--pot-size-big) * 2);

        .wrapper {
            height: var(--pot-size-big);
        }

        .line {
            padding: calc(var(--pot-spacer) / 1.75);
            transform: translateX(calc(-100% + var(--pot-size-big)));
        }
    }

    @include modificator(size, large) {
        min-width: calc(var(--pot-size-large) * 2);

        .wrapper {
            height: var(--pot-size-large);
        }

        .line {
            padding: calc(var(--pot-spacer) / 1.5);
            transform: translateX(calc(-100% + var(--pot-size-large)));
        }
    }

    /* --- Active --- */
    @include modificator(checked) {
        .line {
            transform: none;
            transition:
                background-color 0.4s cubic-bezier(0, 1, 1, 1),
                transform var(--pot-transition);
        }
    }
}

.wrapper {
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 100%;
    height: 0;
    border-radius: var(--pot-radius-circle);
    transition: background-color var(--pot-transition);
}

.line {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition:
        background-color 0.4s ease-in,
        transform var(--pot-transition);
}

.ball {
    aspect-ratio: 1 / 1;
    height: 100%;
    border-radius: inherit;
}
</style>
