<template>
    <svg
        v-html="iconData"
        v-bind="iconAttributes"
        :style="customSize"
        class="pot-icon"
    ></svg>
</template>

<script lang="ts" setup>
// Types
import type { IPotIconProps } from '@/types/components';

// Vue
import { ref, computed, watch, onMounted } from 'vue';

const $props = withDefaults(defineProps<IPotIconProps>(), {
    size: null,
    loader: async (iconName: string) => {
        const icon = await import(`../../assets/icons/${iconName}.svg`);
        return icon?.default && typeof icon?.default === 'string' ? icon.default : '';
    },
});

const iconData = ref<string>('');
const iconAttributes = ref<Record<string, string>>({});

// Lifecycle hooks
onMounted(updateIcon);

/**
 * Если проп size указан, то width: size в ремах / 10
 */
const customSize = computed<Partial<Record<string, string>>>(() => {
    let formattedSize: number = Number($props.size);

    if (!$props.size || isNaN(formattedSize)) {
        return {};
    }

    formattedSize = formattedSize / 10;

    return { width: `${formattedSize}rem` };
});

watch(() => $props.icon, updateIcon);

/**
 * Метод для загрузки и отображения контента svg иконки
 */
async function updateIcon(): Promise<void> {
    try {
        const data = await $props.loader($props.icon);

        const iconWrapper = document.createElement('div');
        iconWrapper.innerHTML = data;

        const iconElement = iconWrapper.querySelector('svg');

        if (!iconElement || !iconElement?.attributes) {
            throw new Error('Invalid data');
        }

        const updatedAttributes: Record<string, string> = {};

        for (const attribute of iconElement.attributes) {
            updatedAttributes[attribute.name] = attribute.value;
        }

        iconData.value = iconElement.innerHTML;
        iconAttributes.value = updatedAttributes;
    } catch (err) {
        console.warn(`[PotIcon/updateIcon] Failed to load icon: ${$props.icon}`, err);
    }
}
</script>

<style>
.pot-icon {
    aspect-ratio: 1 / 1;
    color: inherit;
}
</style>
