<template>
    <main :class="$style.main">
        <div style="display: flex; flex-direction: column; gap: 2rem"></div>

        <PotGrid :size="ESize.MEDIUM">
            <PotInputBase placeholder="Login" />

            <PotInputPassword placeholder="Password" />

            <PotGridCell>
                <PotButton style="width: 100%">Submit</PotButton>
            </PotGridCell>
        </PotGrid>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Enums
import { ESize } from './enums/config';

// Components
import PotGrid from './components/grid/PotGrid.vue';
import PotInputBase from './components/input/PotInputBase.vue';
import PotGridCell from './components/grid/PotGridCell.vue';
import PotButton from './components/button/PotButton.vue';
import PotInputPassword from './components/input/PotInputPassword.vue';
import PotTooltip from './components/tooltip/PotTooltip.vue';
import { ETooltipPosition } from './enums/components';

const flag = ref<boolean>(true);
const ilmu = ref<number | null>(-123);
const kamal = ref<string>('');
const kurban = ref<HTMLElement | null>(null);

function test(event: MouseEvent) {
    console.log(event.target as HTMLElement);
    kurban.value = event.target as HTMLElement;
}
</script>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    // min-width: 900vh;
    min-height: 100vh;

    @include text(h0);
}
</style>
