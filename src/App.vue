<script setup lang="ts">
import { ref } from 'vue';

import PotGrid from './components/grid/PotGrid.vue';
import PotRadioList from './components/radio/PotRadioList.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotLink from './components/link/PotLink.vue';
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
