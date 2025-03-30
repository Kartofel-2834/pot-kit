<script setup lang="ts">
import { ref } from 'vue';

import PotButton from './components/button/PotButton.vue';
import PotCheckList from './components/check/PotCheckList.vue';
import PotGrid from './components/grid/PotGrid.vue';
import PotLink from './components/link/PotLink.vue';

const value = ref<boolean>(true);
const kamal = ref([]);
</script>

<template>
    <main :class="$style.main">
        <PotGrid
            justify-items="center"
            align-content="center"
        >
            <PotCheckList
                v-model="kamal"
                :specs="[1, 2, 3, 4, 5]"
            ></PotCheckList>

            <PotButton> Test </PotButton>

            <PotLink underline>Kamal</PotLink>

            <PotLink
                icon="check"
                active
                >Kamal</PotLink
            >
        </PotGrid>
    </main>
</template>

<style module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
}
</style>
