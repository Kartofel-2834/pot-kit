<template>
    <main :class="$style.main">
        {{ value }}

        <PotInput v-model="value" />

        <PotCheckbox v-model="flag">Kamal</PotCheckbox>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotInput from './components/input/PotInput.vue';

const value = ref<string>('');
const flag = ref<boolean>(false);
</script>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-height: 100vh;

    @include text(h0);
}
</style>
