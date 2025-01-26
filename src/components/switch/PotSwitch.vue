<template>
    <PotCheckbox
        :value="value"
        :model-value="modelValue"
        :class="[$style.PotSwitch, 'pot-switch']"
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
                <div
                    v-if="$slots['true-content'] || trueLabel"
                    :class="[
                        $style.content,
                        $style.trueContent,
                        'pot-switch__wrapper__content',
                        'pot-switch__wrapper__content_true',
                    ]"
                >
                    <slot name="true-content">
                        {{ trueLabel }}
                    </slot>
                </div>

                <div :class="[$style.line, 'pot-switch__wrapper__line']">
                    <div :class="[$style.ball, 'pot-switch__wrapper__line__ball']">
                        <transition name="fade">
                            <PotIcon
                                v-if="icon"
                                :key="icon"
                                :class="[$style.icon, 'pot-switch__wrapper__line__ball__icon']"
                                :icon="icon"
                            />
                        </transition>
                    </div>
                </div>

                <div
                    v-if="$slots['false-content'] || falseLabel"
                    :class="[
                        $style.content,
                        $style.falseContent,
                        'pot-switch__wrapper__content',
                        'pot-switch__wrapper__content_false',
                    ]"
                >
                    <slot name="false-content">
                        {{ falseLabel }}
                    </slot>
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

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Vue
import { defineAsyncComponent } from 'vue';

// Components
import PotCheckbox from '@/components/check/PotCheckbox.vue';

const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

withDefaults(defineProps<IPotSwitchProps>(), {
    value: null,
    modelValue: null,
    fixed: false,
    disabled: false,
    trueValue: true,
    falseValue: false,
    trueLabel: '',
    falseLabel: '',
    color: EColorTheme.PRIMARY,
    size: ESize.MEDIUM,
    radius: ERadius.MEDIUM,
    icon: null,
    devices: () => ALL_DEVICES_REVERSED,
});

defineSlots<{
    default: () => unknown;
    'true-content': () => unknown;
    'false-content': () => unknown;
}>();

const $emit = defineEmits<{
    change: [newValue: TCheckboxValue];
    'update:modelValue': [newValue: TCheckboxValue];
}>();
</script>

<style lang="scss" module>
.PotSwitch {
    width: fit-content;
    font-weight: 500;
    line-height: 1;

    /* --- Colors - START --- */
    .wrapper {
        background-color: var(--pot-switch-false-color);
    }

    .ball {
        background-color: var(--pot-switch-ball-false-color);
    }

    .icon {
        color: var(--pot-switch-icon-false-color);
    }

    .content {
        color: var(--pot-switch-content-false-color);
    }

    .line {
        background-color: transparent;
    }

    @include modificator(checked) {
        .wrapper {
            background-color: var(--pot-switch-true-color);
        }

        .icon {
            color: var(--pot-switch-icon-true-color);
        }

        .ball {
            background-color: var(--pot-switch-ball-true-color);
        }

        .content {
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

        .wrapper {
            height: map-get($size, 'height');
            padding: map-get($size, 'wrapper-padding');
        }

        .content {
            padding: map-get($size, 'wrapper-padding') map-get($size, 'content-padding');
        }

        .trueContent {
            margin-right: $ball-size;
        }

        .falseContent {
            margin-left: $ball-size;
        }

        @include exclude-modificators(checked) {
            .line {
                transform: translateX(calc(-100% + map-get($size, 'height')));
            }
        }
    }

    /* --- Active --- */
    @include modificator(checked) {
        .falseContent {
            opacity: 0;
            transform: translateX(-10%);
        }

        .trueContent {
            opacity: 1;
            transform: none;
        }

        .line {
            transform: none;
        }
    }
}

.wrapper {
    position: relative;
    overflow: hidden;
    display: grid;
    width: 100%;
    height: 0;
    transition: var(--pot-transition);
    border-radius: var(--pot-radius-circle);
}

.content {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    transition:
        background-color var(--pot-transition),
        opacity var(--pot-transition),
        transform var(--pot-transition);
}

.trueContent {
    opacity: 0;
    transform: translateX(10%);
}

.line {
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

.ball {
    position: relative;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: inherit;
    transition: background-color var(--pot-transition);
}

.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    aspect-ratio: 1 / 1;
    transform: translate(-50%, -50%);
    transition: color var(--pot-transition);
}
</style>
