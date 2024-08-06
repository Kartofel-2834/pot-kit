<template>
    <span
        v-html="iconData"
        :class="[$style.PotIcon, 'pot-icon']"
        :style="customSize"
    />
</template>

<script lang="ts" setup>
// Types
import type { IPotIconProps } from '@/types/components/pot-icon-types';

// Vue
import { ref, computed, watch } from 'vue';

const $props = withDefaults(defineProps<IPotIconProps>(), {
    srcPath: '/icons/',
    size: null,
});

const iconData = ref<string>('');

// Computed
const iconPath = computed<string>(() => `${$props.srcPath}${$props.icon}.svg?raw`);

const customSize = computed<Partial<Record<string, string>>>(() => {
    let formattedSize: number = Number($props.size);

    if (!$props.size || isNaN(formattedSize)) {
        return {};
    }

    formattedSize = formattedSize / 10;

    return { width: `${formattedSize}rem`, height: `${formattedSize}rem` };
});

// Watchers
watch(
    () => iconPath.value,
    async () => {
        try {
            const icon = await import(iconPath.value); /* @vite-ignore */

            iconData.value = icon?.default && typeof icon?.default === 'string' ? icon.default : '';
        } catch (err) {
            console.warn(`[PotIcon/watch/iconPath] Failed to load icon: ${$props.icon}`, err);
        }
    },
    { immediate: true },
);
</script>

<style lang="scss" module>
.PotIcon {
    color: inherit;
}
</style>
