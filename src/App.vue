<template>
    <main :class="$style.main">
        <PotCheckbox
            v-model="value"
            true-value="да"
            false-value="нет"
        >
            Checkbox
        </PotCheckbox>
    </main>
</template>

<script setup>
// Components
import PotCheckbox from '@/components/check/PotCheckbox.vue';

import { ref } from 'vue';

const value = ref(false);
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
