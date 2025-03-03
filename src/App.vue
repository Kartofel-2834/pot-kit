<template>
    <main :class="$style.main">
        {{ flag }}
        <PotCheckbox
            v-model="flag"
            color="pot"
            size="tiny"
            radius="tiny"
        >
            Test
        </PotCheckbox>
        <PotCheckbox
            v-model="flag"
            color="pot"
            size="small"
            radius="small"
            disabled
        >
            Test
        </PotCheckbox>
        <PotCheckbox
            v-model="flag"
            color="pot"
            size="medium"
            radius="circle"
            disabled
        >
            Test
        </PotCheckbox>
        <PotCheckbox
            v-model="flag"
            color="pot"
            size="large"
            radius="large"
        >
            Test
        </PotCheckbox>

        <PotButton
            color="pot"
            size="tiny"
            radius="large"
        >
            Kamal
        </PotButton>
        <PotButton
            color="pot"
            size="small"
            radius="medium"
        >
            Kamal
        </PotButton>
        <PotButton
            color="pot"
            size="medium"
            radius="small"
        >
            Kamal
        </PotButton>
        <PotButton
            color="pot"
            size="large"
            radius="circle"
        >
            Kamal
        </PotButton>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import { useDeviceIs } from './composables/device-is';

const $deviceIs = useDeviceIs();

const flag = ref<boolean>(false);
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
