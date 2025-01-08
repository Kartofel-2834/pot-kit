<template>
    <main :class="$style.main">
        <div style="width: fit-content; display: flex; flex-direction: column; gap: 2rem">
            <PotRadio
                v-model="kamal"
                :size="ESize.TINY"
                :color="EColorTheme.BEETROT"
                :specs="['1', '2', '3']"
            >
                Kamal
            </PotRadio>

            <PotRadio
                v-model="kamal"
                :size="ESize.SMALL"
                :color="EColorTheme.CUCUMBER"
                :specs="['1', '2', '3']"
            >
                Kamal
            </PotRadio>

            <PotRadio
                v-model="kamal"
                :size="ESize.MEDIUM"
                :color="EColorTheme.CORN"
                :specs="['1', '2', '3']"
            >
                Kamal
            </PotRadio>

            <PotRadio
                v-model="kamal"
                :size="ESize.BIG"
                :color="EColorTheme.PRIMARY"
                :specs="['1', '2', '3']"
            >
                Kamal
            </PotRadio>

            <PotRadio
                v-model="kamal"
                :size="ESize.LARGE"
                :color="EColorTheme.ONION"
                :specs="['1', '2', '3']"
            >
                Kamal
            </PotRadio>
        </div>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Enums
import { EColorTheme, EIcon } from './enums/config';
import { ERadius, ESize } from './enums/components';

// Components
import PotRadio from './components/radio/PotRadio.vue';

const flag = ref<boolean>(false);
const kamal = ref<string>('');
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
