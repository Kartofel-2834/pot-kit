<template>
    <main :class="$style.main">
        {{ value }}

        <PotButton
            :color="EColorTheme.PRIMARY"
            :size="[ESize.LARGE, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
            disabled
        >
            Test
        </PotButton>

        <PotLink
            underline
            disabled
        >
            Kamal
        </PotLink>

        <PotRadio
            v-model="kamal"
            :specs="[1, 2, 3]"
        >
        </PotRadio>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Enums
import { ESize } from './enums/components';
import { EColorTheme } from './enums/config';

// Components
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotInput from './components/input/PotInput.vue';
import PotButton from './components/button/PotButton.vue';
import PotLink from './components/link/PotLink.vue';
import PotRadio from './components/radio/PotRadio.vue';

const value = ref<string>('');
const kamal = ref<number>(1);
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
