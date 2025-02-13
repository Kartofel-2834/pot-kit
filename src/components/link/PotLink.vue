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
import type { TDeviceIs } from '@/types/composables';

// Enums
import { EColorTheme } from '@/enums/config';

// Vue
import { defineAsyncComponent, inject } from 'vue';

// Components
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { ESize } from '@/enums/config';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotLinkProps>(), {
    tag: 'a',
    link: null,
    target: null,
    toAttribute: 'href',
    icon: '',
    preicon: '',
    disabled: false,
    underline: false,
    active: false,
    size: ESize.MEDIUM,
    color: EColorTheme.PRIMARY,
    devices: () => ALL_DEVICES_REVERSED,
});

const $deviceIs = inject<TDeviceIs>('deviceIs');

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
        $deviceIs?.device?.value,
    );
});

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value,
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
    font-weight: 500;
    line-height: 1;
    width: fit-content;
    font-size: inherit;
    user-select: none;
    cursor: pointer;
    transition:
        opacity var(--pot-transition),
        color var(--pot-transition);

    /* --- Colors - START --- */
    color: var(--pot-link-text-color);

    &:after {
        background-color: var(--pot-link-underline-color);
    }

    @include exclude-modificators(disabled) {
        @include exclude-modificators(active) {
            &:not(:active):hover {
                color: var(--pot-link-hover-text-color);

                &:after {
                    background-color: var(--pot-link-underline-hover-color);
                }
            }

            &:active {
                color: var(--pot-link-active-text-color);

                &:after {
                    background-color: var(--pot-link-underline-active-color);
                }
            }

            @include modificator(underline) {
                &:not(:active):hover {
                    color: var(--pot-link-underline-hover-text-color);
                }

                &:active {
                    color: var(--pot-link-underline-active-text-color);
                }
            }
        }
    }

    @include exclude-modificators(disabled) {
        @include modificator(active) {
            color: var(--pot-link-active-text-color);

            @include modificator(underline) {
                color: var(--pot-link-underline-active-text-color);
            }
        }
    }
    /* --- Colors - END --- */

    /* --- Sizes ---  */
    $standard-size: (
        text: var(--pot-link-size-text),
    );

    @include size($standard-size) using ($size, $size-name) {
        font-size: map-get($size, 'text');

        &:after {
            @if $size-name == 'tiny' {
                height: 1px;
            } @else {
                height: 2px;
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
        cursor: not-allowed;
    }

    &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        transform-origin: left;
        transform: translateY(100%) scaleX(0);
        transition:
            background-color var(--pot-transition),
            transform var(--pot-transition);
    }

    .icon {
        flex-shrink: 0;
        width: 1em;
    }
}
</style>
