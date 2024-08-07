<template>
    <main :class="$style.main">
        <PotLink
            link="https://element.eleme.io/#/en-US/component/link"
            underline
            disabled
        >
            Kamal
        </PotLink>
    </main>
</template>

<script setup>
// Components
import PotLink from './components/link/PotLink.vue';

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
