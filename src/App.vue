<script setup lang="ts">
import { ref } from 'vue';

import PotGrid from './components/grid/PotGrid.vue';
import PotRadioList from './components/radio/PotRadioList.vue';

const value = ref<number>(NaN);
const specs = ref<number[]>([1, 2, 3, 4, 5]);
</script>

<template>
    <main class="main">
        <PotGrid
            cols="2"
            justify-items="center"
            align-content="center"
        >
            <PotRadioList
                v-model="value"
                :specs="specs"
                size="tiny"
            />

            <PotRadioList
                v-model="value"
                :specs="specs"
                size="small"
            />

            <PotRadioList
                v-model="value"
                :specs="specs"
                size="medium"
            />

            <PotRadioList
                v-model="value"
                :specs="specs"
                size="large"
            />
        </PotGrid>
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
