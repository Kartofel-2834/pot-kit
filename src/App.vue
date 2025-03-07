<template>
    <main :class="$style.main">
        <div
            :style="{
                height: `${10 * num}px`,
                width: '50vw',
                background: 'red',
                overflow: 'scroll',
            }"
        >
            {{ 'Kamal '.repeat(10000) }}
        </div>

        <div :style="{ height: `100px`, width: '50vh', background: 'blue' }"></div>

        <PotCheckbox
            v-model="flag"
            size="small"
            color="pot"
        >
            Start
        </PotCheckbox>

        <PotButton
            size="medium"
            color="pot"
            @click="num++"
        >
            {{ num }}
        </PotButton>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { computed, ref } from 'vue';

// Components
import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';

// Composables
import { useDeviceIs } from './composables/device-is';
import { useScrollObserver, useScrollDirective } from './composables/scroll-observer';

const $deviceIs = useDeviceIs();

const flag = ref<boolean>(false);
const num = ref<number>(10);

const mode = computed(() => (flag.value ? 'start' : 'end'));

const specs = ref([
    { label: 'a', value: 1 },
    { label: 'b', value: 2 },
    { label: 'c', value: 3 },
    { label: 'd', value: 4 },
    { label: 'e', value: 5 },
    { label: 'f', value: 6 },
]);

// Methods
function onScroll(event: Event) {
    console.log('onScroll', event);
}
</script>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300vh;
    gap: 2rem;
}
</style>
