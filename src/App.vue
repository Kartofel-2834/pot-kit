<script setup lang="ts">
import PotButton from './components/button/PotButton.vue';
</script>

<template>
    <main :class="$style.main">
        <PotButton
            color="pot"
            size="medium"
        >
            Kamal
        </PotButton>
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
