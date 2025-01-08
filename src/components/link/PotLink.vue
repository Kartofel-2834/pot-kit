<template>
    <component
        :class="[$style.PotLink, 'pot-link', classList]"
        :is="tag"
        :target="currentTarget"
        :[toAttribute]="currentLink"
    >
        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :class="[$style.icon, 'pot-link__icon', 'pot-link__icon_pre']"
                :icon="preicon"
            />
        </slot>

        <slot />

        <slot name="icon">
            <PotIcon
                v-if="icon"
                :class="[$style.icon, 'pot-link__icon', 'pot-link__icon_post']"
                :icon="icon"
            />
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotLinkProps } from '@/types/components';

// Enums
import { EColorTheme } from '@/enums/config';

// Vue
import { defineAsyncComponent } from 'vue';

// Components
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { ESize } from '@/enums/components';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotLinkProps>(), {
    tag: 'a',
    link: null,
    target: null,
    toAttribute: 'href',
    icon: null,
    preicon: null,
    disabled: false,
    underline: false,
    active: false,
    size: ESize.MEDIUM,
    color: EColorTheme.PRIMARY,
    devices: () => ALL_DEVICES_REVERSED,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties(
        {
            color: $props.color,
            size: $props.size,
        },
        $props.devices,
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        disabled: $props.disabled,
        underline: $props.underline,
        active: $props.active,
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
    display: flex;
    align-items: center;
    gap: 0.2em;
    width: fit-content;
    font-size: inherit;
    user-select: none;
    cursor: pointer;
    transition:
        opacity var(--pot-transition),
        color var(--pot-transition);

    /* --- Sizes ---  */
    @include modificator(size, tiny) {
        @include text(l7);

        &:after {
            height: 1px;
        }
    }

    @include modificator(size, small) {
        @include text(l6);

        &:after {
            height: 1px;
        }
    }

    @include modificator(size, medium) {
        @include text(l4);
    }

    @include modificator(size, big) {
        @include text(l3);
    }

    @include modificator(size, large) {
        @include text(l2);

        &:after {
            height: 4px;
        }
    }

    /* --- Colors --- */
    @include color-theme() using ($theme) {
        $active: map-get($theme, 'active');
        $hover: map-get($theme, 'hover');
        $disabled: map-get($theme, 'disabled');

        @include exclude-modificators(disabled) {
            @include exclude-modificators(active) {
                &:not(:active):hover {
                    color: map-get($hover, 'color');
                }

                &:active {
                    color: map-get($active, 'color');
                }
            }

            @include modificator(active) {
                color: map-get($active, 'color');
            }
        }

        @include modificator(disabled) {
            color: map-get($disabled, 'color');
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

            @include modificator(active) {
                &:after {
                    transform: translateY(100%) scaleX(1);
                }
            }
        }
    }

    /* --- Active --- */
    @include modificator(active) {
        cursor: default;
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
        transition: transform var(--pot-transition);
    }

    .icon {
        flex-shrink: 0;
        width: 1em;
    }
}
</style>
