<template>
    <main :class="$style.main">
        <PotButton
            size="48"
            color="clay"
            radius="8"
            preicon="pot"
        >
            Some text
        </PotButton>
    </main>
</template>

<script setup>
// Components
import PotButton from '@/components/button/PotButton.vue';
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
