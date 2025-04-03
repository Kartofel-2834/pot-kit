<script setup lang="ts">
import { ref } from 'vue';

import PotButton from './components/button/PotButton.vue';

const value = ref<boolean>(false);
const specs = ref<number[]>([1, 2, 3, 4, 5]);
</script>

<template>
    <main class="main">
        <PotButton>Test</PotButton>
    </main>
</template>

<style>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
}
</style>
