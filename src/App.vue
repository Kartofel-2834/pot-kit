<template>
    <main :class="$style.main">
        <PotGrid
            gap="medium"
            align="start"
        >
            <PotInputBase
                color="pot"
                size="small"
                radius="circle"
                placeholder="Login"
                icon="eye"
                preicon="check"
            />

            <PotInputPassword
                placeholder="Password"
                size="small"
                radius="circle"
                icon="eye"
                color="pot"
                preicon="check"
            />
        </PotGrid>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Components
import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotCheckList from './components/check/PotCheckList.vue';
import PotInputPassword from './components/input/PotInputPassword.vue';

import { useDeviceIs } from './composables/device-is';
import PotGrid from './components/grid/PotGrid.vue';
import PotGroup from './components/group/PotGroup.vue';
import PotGroupItem from './components/group/PotGroupItem.vue';
import PotInputBase from './components/input/PotInputBase.vue';

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
