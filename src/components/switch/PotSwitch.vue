<template>
    <PotCheckbox
        :value="$props.value"
        :model-value="$props.modelValue"
        :size="size"
        :color="color"
        :radius="radius"
        :true-value="$props.trueValue"
        :false-value="$props.falseValue"
        :disabled="disabled"
        class="pot-switch"
        @change="$emit('change', $event)"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template #content>
            <div class="pot-switch__wrapper">
                <div
                    v-if="$slots['true-content'] || trueLabel"
                    class="pot-switch__wrapper__content pot-switch__wrapper__content_true"
                >
                    <slot name="true-content">
                        {{ trueLabel }}
                    </slot>
                </div>

                <div class="pot-switch__wrapper__line">
                    <div class="pot-switch__wrapper__line__ball">
                        <Transition name="fade">
                            <PotIcon
                                v-if="icon"
                                :key="icon"
                                :icon="icon"
                                class="pot-switch__wrapper__line__ball__icon"
                            />
                        </Transition>
                    </div>
                </div>

                <div
                    v-if="$slots['false-content'] || falseLabel"
                    class="pot-switch__wrapper__content pot-switch__wrapper__content_false"
                >
                    <slot name="false-content">
                        {{ falseLabel }}
                    </slot>
                </div>
            </div>
        </template>
    </PotCheckbox>
</template>

<script lang="ts" generic="T extends TSpecValue = boolean" setup>
// Types
import type { IPotSwitchProps, IPotSwitchSlots } from '@/types/components/pot-switch-types';
import type { TSpecValue } from '@/types/composables';

// Enums
import { ERadius } from '@/enums/components';
import { EColorTheme, ESize } from '@/enums/config';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Vue
import { defineAsyncComponent } from 'vue';

// Components
import PotCheckbox from '@/components/check/PotCheckbox.vue';

const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotSwitchProps<T>>(), {
    fixed: false,
    disabled: false,
    trueLabel: '',
    falseLabel: '',
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
    radius: ERadius.MEDIUM,
    icon: '',
    devices: () => ALL_DEVICES_REVERSED,
});

defineSlots<IPotSwitchSlots>();

const $emit = defineEmits<{
    change: [newValue: T | boolean];
    'update:modelValue': [newValue: T | boolean];
}>();
</script>

<style lang="scss">
.pot-switch {
    width: fit-content;
    font-weight: 500;
    line-height: 1;

    /* --- Colors - START --- */
    .pot-switch__wrapper {
        background-color: var(--pot-switch-false-color);
    }

    .pot-switch__wrapper__line__ball {
        background-color: var(--pot-switch-ball-false-color);
    }

    .pot-switch__wrapper__line__ball__icon {
        color: var(--pot-switch-icon-false-color);
    }

    .pot-switch__wrapper__content {
        color: var(--pot-switch-content-false-color);
    }

    .pot-switch__wrapper__line {
        background-color: transparent;
    }

    @include modificator(checked) {
        .pot-switch__wrapper {
            background-color: var(--pot-switch-true-color);
        }

        .pot-switch__wrapper__line__ball__icon {
            color: var(--pot-switch-icon-true-color);
        }

        .pot-switch__wrapper__line__ball {
            background-color: var(--pot-switch-ball-true-color);
        }

        .pot-switch__wrapper__content {
            color: var(--pot-switch-content-true-color);
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    $standard-size: (
        height: var(--pot-switch-size-height),
        text: var(--pot-switch-size-text),
        wrapper-padding: var(--pot-switch-size-wrapper-padding),
        content-padding: var(--pot-switch-size-label-padding),
    );

    @include size($standard-size) using ($size, $size-name) {
        $ball-size: calc(#{map-get($size, 'height')} - (#{map-get($size, 'wrapper-padding')} * 2));

        height: map-get($size, 'height');
        min-width: calc(#{map-get($size, 'height')} * 2);
        font-size: map-get($size, 'text');

        .pot-switch__wrapper {
            height: map-get($size, 'height');
            padding: map-get($size, 'wrapper-padding');
        }

        .pot-switch__wrapper__content {
            padding: 0 map-get($size, 'content-padding');
        }

        .pot-switch__wrapper__content_true {
            margin-right: $ball-size;
        }

        .pot-switch__wrapper__content_false {
            margin-left: $ball-size;
        }

        @include exclude-modificator(checked) {
            .pot-switch__wrapper__line {
                transform: translateX(calc(-100% + map-get($size, 'height')));
            }
        }
    }

    /* --- Active --- */
    @include modificator(checked) {
        .pot-switch__wrapper__content_false {
            opacity: 0;
            transform: translateX(-10%);
        }

        .pot-switch__wrapper__content_true {
            opacity: 1;
            transform: none;
        }

        .pot-switch__wrapper__line {
            transform: none;
        }
    }
}

.pot-switch__wrapper {
    position: relative;
    overflow: hidden;
    display: grid;
    width: 100%;
    height: 0;
    transition: var(--pot-transition);
    border-radius: var(--pot-radius-circle);
}

.pot-switch__wrapper__content {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    transition:
        background-color var(--pot-transition),
        opacity var(--pot-transition),
        transform var(--pot-transition);
}

.pot-switch__wrapper__content_true {
    opacity: 0;
    transform: translateX(10%);
}

.pot-switch__wrapper__line {
    position: absolute;
    z-index: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding: inherit;
    border-radius: inherit;
    background-color: transparent;
    transition: transform var(--pot-transition);
}

.pot-switch__wrapper__line__ball {
    position: relative;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: inherit;
    transition: background-color var(--pot-transition);
}

.pot-switch__wrapper__line__ball__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    aspect-ratio: 1 / 1;
    transform: translate(-50%, -50%);
    transition: color var(--pot-transition);
}
</style>
