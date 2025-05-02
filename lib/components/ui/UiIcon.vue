<script lang="ts" setup>
// Types
import type { IUiIconProps } from '@/types/pot-kit/components/icon';

// Vue
import { ref, computed, watch, onMounted } from 'vue';

const $props = withDefaults(defineProps<IUiIconProps>(), {
    loader: async (iconName: string) => {
        const icon = await import(`../../assets/icons/${iconName}.svg`);
        return icon?.default && typeof icon?.default === 'string' ? icon.default : '';
    },
});

const iconTag = ref<string | null>(null);
const iconData = ref<string>('');
const iconAttributes = ref<Record<string, string>>({});

// Lifecycle hooks
onMounted(updateIcon);

/**
 * Если проп size указан, то width: size в ремах / 10
 */
const customSize = computed<Partial<Record<string, string>>>(() => {
    let formattedSize: number = Number($props.size);

    if ($props.size === undefined || $props.size === null || isNaN(formattedSize)) {
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

        const iconElement = iconWrapper.firstChild as Element | null;

        if (!iconElement || !iconElement?.attributes) {
            throw new Error(`invalid data: ${data}`);
        }

        const updatedAttributes: Record<string, string> = {};

        for (const attribute of iconElement.attributes) {
            updatedAttributes[attribute.name] = attribute.value;
        }

        iconTag.value = iconElement.tagName;
        iconData.value = iconElement.innerHTML;
        iconAttributes.value = updatedAttributes;
    } catch (err) {
        console.warn(`[UiIcon/updateIcon] Failed to load icon: ${$props.icon}`, err);
    }
}
</script>

<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <component
        :is="iconTag"
        v-html="iconData"
        v-bind="iconAttributes"
        :style="customSize"
        class="ui-icon"
    />
</template>
