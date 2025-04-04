<script setup lang="ts">
import { ref } from 'vue';

import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotGrid from './components/grid/PotGrid.vue';
import PotRadioList from './components/radio/PotRadioList.vue';
import PotLink from './components/link/PotLink.vue';
import PotInputBase from './components/input/PotInputBase.vue';

const value = ref<string>('');
const specs = ref<number[]>([1, 2, 3, 4, 5]);
</script>

<template>
    <main class="main">
        <PotInputBase
            style="width: 40rem"
            v-model="value"
            size="tiny"
            icon="pot"
            preicon="pot"
            invalid
        ></PotInputBase>

        <PotInputBase
            style="width: 40rem"
            v-model="value"
            size="small"
            icon="pot"
            preicon="pot"
            invalid
        ></PotInputBase>

        <PotInputBase
            style="width: 40rem"
            v-model="value"
            size="medium"
            icon="pot"
            preicon="pot"
            invalid
        ></PotInputBase>

        <PotInputBase
            style="width: 40rem"
            v-model="value"
            size="large"
            icon="pot"
            preicon="pot"
            invalid
        ></PotInputBase>
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
