<script setup lang="ts">
import { ref } from 'vue';

import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotCheckList from './components/check/PotCheckList.vue';
import PotGroup from './components/group/PotGroup.vue';
import PotGrid from './components/grid/PotGrid.vue';

const value = ref<boolean>(true);
const kamal = ref([]);
</script>

<template>
    <main :class="$style.main">
        <PotGrid cols="3">
            <PotCheckList
                v-model="kamal"
                :specs="[1, 2, 3, 4, 5]"
            ></PotCheckList>

            <PotButton>Test</PotButton>
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
