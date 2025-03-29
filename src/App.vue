<script setup lang="ts">
import { ref } from 'vue';

import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotCheckList from './components/check/PotCheckList.vue';
import PotGroup from './components/group/PotGroup.vue';

const value = ref<boolean>(true);
const kamal = ref([]);
</script>

<template>
    <main :class="$style.main">
        <PotButton> Test </PotButton>

        <PotGroup>
            <PotCheckList
                v-model="kamal"
                :specs="[1, 2, 3, 4, 5]"
            ></PotCheckList>
        </PotGroup>

        <PotCheckbox v-model="value"> Test </PotCheckbox>
    </main>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
}
</style>
