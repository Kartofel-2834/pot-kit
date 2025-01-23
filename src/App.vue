<template>
    <main :class="$style.main">
        <div style="width: 50%; display: flex; flex-direction: column; gap: 2rem">
            <PotSwitch
                v-model="flag"
                :size="ESize.TINY"
                :color="EColorTheme.BEETROT"
            />
            <PotSwitch
                v-model="flag"
                :size="ESize.SMALL"
                :color="EColorTheme.CORN"
            />
            <PotSwitch
                v-model="flag"
                :size="ESize.MEDIUM"
                :color="EColorTheme.CUCUMBER"
            />
            <PotSwitch
                v-model="flag"
                :size="ESize.BIG"
                :color="EColorTheme.ONION"
            />
            <PotSwitch
                v-model="flag"
                :size="ESize.LARGE"
                :color="EColorTheme.PRIMARY"
            />
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
import PotSwitch from './components/switch/PotSwitch.vue';

const flag = ref<boolean>(false);
const ilmu = ref<number | null>(-123);
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
