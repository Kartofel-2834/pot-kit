<template>
    <component
        :class="[$style.PotLink, 'pot-link', classList]"
        :style="colorThemeCssVars"
        :is="tag"
        :target="currentTarget"
        :[toAttribute]="currentLink"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotLinkProps } from '@/types/components';

// Enums
import { EColorTheme } from '@/enums/config';

// Components
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useColorTheme } from '@/composables/color-theme';

// Constants
import { ALL_DEVICES } from '@/composables/device-is';

const $props = withDefaults(defineProps<IPotLinkProps>(), {
    tag: 'a',
    link: null,
    target: null,
    toAttribute: 'href',
    icon: '',
    preicon: '',
    disabled: false,
    underline: false,
    color: EColorTheme.PRIMARY,
    devices: () => ALL_DEVICES,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties({ color: $props.color }, $props.devices);
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        color: Boolean($props.color),
        disabled: $props.disabled,
        underline: $props.underline,
    }),
);

/** Цветовая тема */
const colorThemeCssVars = computed(() => useColorTheme(properties.value.value.color));

/**
 * Вычисляет и возвращает атрибут target для ссылки на основе свойств link и target.
 *
 * Для target: null работают следующие правила:
 * Если ссылка внешняя, атрибут target будет '_blank'
 * Если ссылка внутренняя, атрибут target будет '_self'.
 */
const currentTarget = computed<string | null>(() => {
    if (!$props.link || $props.disabled) return null;

    if ($props.target) return $props.target;

    const isLinkExternal = /^https?:\/\//.test($props.link);

    return isLinkExternal ? '_blank' : '_self';
});

/**
 * Url ссылки передаваемый в атрибут [toAttribute], если ссылка не пустая и не отключена.
 */
const currentLink = computed<string | null>(() => {
    if (!$props.link || $props.disabled) return null;

    return $props.link;
});
</script>

<style lang="scss" module>
.PotLink {
    position: relative;
    font-size: inherit;
    user-select: none;
    cursor: pointer;
    transition:
        opacity var(--transition),
        color var(--transition);

    /* --- Colors --- */
    @include modificator(color) {
        @include exclude-modificators(disabled) {
            &:not(:active):hover {
                color: var(--color);
            }

            &:active {
                color: var(--color-active);
            }
        }
    }

    /* --- Flags --- */
    @include modificator(underline) {
        &:after {
            content: '';
        }

        @include exclude-modificators(disabled) {
            &:hover {
                &:after {
                    transform: translateY(100%) scaleX(1);
                }
            }
        }
    }

    /* --- Disabled --- */
    @include modificator(disabled) {
        color: var(--base-400);
        cursor: not-allowed;
    }

    &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: currentColor;
        transform-origin: left;
        transform: translateY(100%) scaleX(0);
        transition: transform var(--transition);
    }
}
</style>
