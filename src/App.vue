<script setup lang="ts">
import { ref } from 'vue';

import PotTooltip from './components/tooltip/PotTooltip.vue';

const value = ref<string>('');
const specs = ref<number[]>([1, 2, 3, 4, 5]);
</script>

<template>
    <main class="main">
        <PotTooltip text="test" visible>
            <div class="square"></div>
        </PotTooltip>
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

.square {
    width: 400px;
    height: 400px;
    background-color: red;
}
</style>
