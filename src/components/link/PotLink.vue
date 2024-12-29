<template>
    <component
        :class="[$style.PotLink, 'pot-link', classList]"
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

// Components
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

const $props = withDefaults(defineProps<IPotLinkProps>(), {
    tag: 'a',
    link: null,
    target: null,
    toAttribute: 'href',
    color: 'clay',
    breakpoints: 'desktop tablet mobile',
    icon: '',
    preicon: '',
    disabled: false,
    underline: false,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: { color: $props.color },
    });
});

/**
 * Классы модификаторы компонента
 */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        disabled: $props.disabled,
        underline: $props.underline,
    }),
);

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
        opacity $default-transition,
        color $default-transition;

    /* --- Colors --- */
    @include modificator(color, clay) {
        @include exclude-modificators(disabled) {
            &:hover {
                color: $clay-pot-100;
            }
        }
    }

    /* --- Flags --- */
    @include modificator(underline) {
        &:after {
            content: '';
        }
    }

    @include modificator(disabled) {
        cursor: not-allowed;
    }

    @include exclude-modificators(disabled) {
        &:hover {
            &:after {
                transform: translateY(100%) scaleX(1);
            }
        }

        &:active {
            opacity: 0.8;
        }
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
        transition: transform $default-transition;
    }
}
</style>
