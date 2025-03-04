<template>
    <main :class="$style.main">
        <PotGroup
            gap="medium"
            direction="column"
            align="start"
        >
            <PotCheckList
                v-model="num"
                :specs="specs"
                value-name="value"
                color="pot"
                size="medium"
                gap="medium"
                radius="medium"
            />
        </PotGroup>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotCheckList from './components/check/PotCheckList.vue';

import { useDeviceIs } from './composables/device-is';
import PotGrid from './components/grid/PotGrid.vue';
import PotGroup from './components/group/PotGroup.vue';

const $deviceIs = useDeviceIs();

const flag = ref<boolean>(false);
const num = ref<number[]>([]);

const specs = ref([
    { label: 'a', value: 1 },
    { label: 'b', value: 2 },
    { label: 'c', value: 3 },
    { label: 'd', value: 4 },
    { label: 'e', value: 5 },
    { label: 'f', value: 6 },
]);
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
