<template>
    <main :class="$style.main">Hello {{ screenSize.device }}</main>
</template>

<script setup>
// Composables
import { useScreenSize } from '@/composables/screen-size.js';

const screenSize = useScreenSize();
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
