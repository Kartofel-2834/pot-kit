<template>
    <main :class="$style.main">
        value: {{ value }}

        <PotCheckList
            v-model="value"
            :specs="specs"
            resetable
        />

        <PotButton @click="() => specs.push(specs[specs.length - 1] + 1)">Add</PotButton>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotCheckList from '@/components/check/PotCheckList.vue';
import PotButton from './components/button/PotButton.vue';

const value = ref<number[]>([1]);
const specs = ref<number[]>([1, 2, 3]);
</script>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-height: 100vh;

    @include text(h0, m);
}
</style>
