<template>
    <main :class="$style.main">
        {{ value }}

        <PotInput v-model="value" />
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotInput from './components/input/PotInput.vue';

const value = ref<string>('');
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
