<template>
    <div :class="[$style.PotFormHint, 'pot-form-hint', 'fade-enter-active']">
        <slot name="label">
            <div
                v-if="label"
                :class="[$style.label, 'pot-form-hint__label']"
                v-html="label"
            />
        </slot>

        <slot />

        <transition
            name="fade"
            mode="out-in"
        >
            <span
                v-if="error?.length || $slots?.error"
                v-show="!disabled && error"
                :class="[$style.error, 'pot-form-hint__error']"
            >
                <slot name="error">
                    {{ error }}
                </slot>
            </span>
        </transition>
    </div>
</template>

<script lang="ts" setup>
// Types
import type { IPotFormHintProps } from '@/types/components/pot-form-types';

withDefaults(defineProps<IPotFormHintProps>(), {
    label: '',
    description: '',
    error: '',
    disabled: false,
});
</script>

<style lang="scss" module>
.PotFormHint {
    font-size: inherit;
}

.label,
.error {
    font-weight: 500;
    line-height: 112%;
}

.label {
    margin-bottom: 0.8rem;
}

.error {
    margin-top: 0.8rem;
    pointer-events: none;
    user-select: none;
    color: $error-500;
    transition: opacity $default-transition;
}
</style>
