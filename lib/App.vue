<script setup lang="ts">
// Composables
import { useDeviceIs } from '@/composables/device-is';

// Components
import UiButton from '@/components/ui/UiButton.vue';

const $deviceIs = useDeviceIs();
</script>

<template>
    <main class="main">
        {{ $deviceIs.device }}

        <UiButton
            color="pot"
            :size="['large', 'medium', 'small', 'tiny']"
            :devices="['mobile', 'tablet', 'desktop']"
        >
            Test
        </UiButton>
    </main>
</template>

<style>
.main {
}
</style>

<!-- POT-STYLE - START -->
<style>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
}

.square {
    width: 400px;
    height: 400px;
    background-color: red;
}
</style>
<!-- POT-STYLE - END -->
