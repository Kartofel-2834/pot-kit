<template>
    <main :class="$style.main">
        <PotButton
            size="56 48 32"
            color="red _ blue"
            breakpoints="desktop tablet mobile"
        >
            Button
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
