<script lang="ts">
// Composables
import { usePropsDefaults } from '@/composables/props-defaults';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { POT_LINK_DEFAULTS } from '@/constants/defaults';

const $propsDefaults = {
    tag: 'a',
    toAttribute: 'href',
    devices: () => ALL_DEVICES_REVERSED,
};

const $configDefaults = usePropsDefaults(POT_LINK_DEFAULTS);
</script>

<script lang="ts" setup>
// Types
import type { IPotLinkProps } from '@/types/components';
import type { TDeviceIs } from '@/types/composables';
import type { TPropsDefaults } from '@/types';

// Vue
import { defineAsyncComponent, inject } from 'vue';

// Components
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotLinkProps>(), {
    ...$propsDefaults,
    ...$configDefaults,
} as TPropsDefaults<IPotLinkProps>);

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

<template>
    <component
        :class="['pot-link', classList]"
        :is="tag"
        :target="currentTarget"
        :[toAttribute]="currentLink"
    >
        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :icon="preicon"
                class="pot-link__icon pot-link__icon_pre"
            />
        </slot>

        <slot />

        <slot name="icon">
            <PotIcon
                v-if="icon"
                :icon="icon"
                class="pot-link__icon pot-link__icon_post"
            />
        </slot>
    </component>
</template>

<style src="@/assets/css/base/pot-link.css" />
<style src="@/assets/css/configuration/pot-link.css" />
<style src="@/assets/css/preset/pot-link.css" />
