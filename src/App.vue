<template>
    <main :class="$style.main">
        <PotButton> Kamal soska </PotButton>
        <PotButton
            size="tiny"
            color="pot"
            icon="check"
            preicon="check"
        >
            Kamal soska
        </PotButton>
        <PotButton
            size="small"
            color="pot"
            icon="check"
            preicon="check"
        >
            Kamal soska
        </PotButton>
        <PotButton
            size="medium"
            color="pot"
            icon="check"
            preicon="check"
        >
            Kamal soska
        </PotButton>
        <PotButton
            size="large"
            color="pot"
            icon="check"
            preicon="check"
        >
            Kamal soska
        </PotButton>
    </main>
</template>

<script lang="ts" setup>
// Components
import PotButton from './components/button/PotButton.vue';
</script>

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
