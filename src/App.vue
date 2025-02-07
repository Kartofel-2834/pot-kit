<template>
    <main :class="$style.main">
        <div style="display: flex; flex-direction: column; gap: 2rem"></div>

        <PotTooltip :position="ETooltipPosition.RIGHT_END">
            <div style="width: 50px; height: 600px; background-color: lightblue"></div>
        </PotTooltip>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Enums
import { EColorTheme, EIcon } from './enums/config';
import { ERadius, ESize, ETooltipPosition } from './enums/components';

// Components
import PotSwitch from './components/switch/PotSwitch.vue';
import PotInputNumber from './components/input/PotInputNumber.vue';
import PotInputMasked from './components/input/PotInputMasked.vue';
import PotIcon from './components/icon/PotIcon.vue';
import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotLink from './components/link/PotLink.vue';
import PotRadio from './components/radio/PotRadio.vue';
import PotInputBase from './components/input/PotInputBase.vue';
import PotTooltip from './components/tooltip/PotTooltip.vue';

const flag = ref<boolean>(true);
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
    // min-width: 900vh;
    min-height: 300vh;

    @include text(h0);
}
</style>
