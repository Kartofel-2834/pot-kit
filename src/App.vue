<template>
    <main :class="$style.main">
        <div style="width: 50%; display: flex; flex-direction: column; gap: 2rem">
            <PotCheckbox
                v-model="flag"
                :color="EColorTheme.CUCUMBER"
                :size="ESize.TINY"
            >
                Kamal
            </PotCheckbox>
            <PotCheckbox
                v-model="flag"
                :color="EColorTheme.PEPPER"
                :size="ESize.SMALL"
            >
                Kamal
            </PotCheckbox>
            <PotCheckbox
                v-model="flag"
                :color="EColorTheme.POTATO"
                :size="ESize.MEDIUM"
            >
                Kamal
            </PotCheckbox>
            <PotCheckbox
                v-model="flag"
                :color="EColorTheme.POT"
                :size="ESize.BIG"
            >
                Kamal
            </PotCheckbox>
            <PotCheckbox
                v-model="flag"
                :color="EColorTheme.PRIMARY_OUTLINED"
                :size="ESize.LARGE"
            >
                Kamal
            </PotCheckbox>
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
import PotCheckbox from './components/check/PotCheckbox.vue';

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
