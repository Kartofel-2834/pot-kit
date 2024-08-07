<template>
    <main :class="$style.main">
        <PotButton
            :class="$style.customButton"
            size="56"
            radius="100"
            preicon="pot"
            icon="pot-filled"
            @click="handleClick"
        >
            Content
        </PotButton>
    </main>
</template>

<script setup>
// Components
import PotButton from '@/components/button/PotButton.vue';

function handleClick() {
    alert(42);
}
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
