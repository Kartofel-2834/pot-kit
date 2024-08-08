<template>
    <main :class="$style.main">
        {{ value }}

        <PotRadio
            v-model="value"
            :specs="specs"
            :facets="facets"
        />
    </main>
</template>

<script setup>
// Components
import PotRadio from './components/radio/PotRadio.vue';

import { ref } from 'vue';

const value = ref(null);
const specs = ref([1, 2, 3]);
const facets = ref([1, 2]);
</script>

<style lang="scss" module>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    @include text(h0, m);
}
</style>
