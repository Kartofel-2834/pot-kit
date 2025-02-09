<template>
    <main :class="$style.main">
        <div style="display: flex; flex-direction: column; gap: 2rem"></div>

        <PotTooltip text="Kamal">
            <div style="width: 50px; height: 600px; background-color: lightblue"></div>
        </PotTooltip>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotTooltip from './components/tooltip/PotTooltip.vue';

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
    min-height: 300vh;

    @include text(h0);
}
</style>
