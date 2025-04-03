<script setup lang="ts">
import { ref } from 'vue';

import PotButton from './components/button/PotButton.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotGrid from './components/grid/PotGrid.vue';
import PotRadioList from './components/radio/PotRadioList.vue';
import PotLink from './components/link/PotLink.vue';

const value = ref<number | null>(2);
const specs = ref<number[]>([1, 2, 3, 4, 5]);
</script>

<template>
    <main class="main">
        <PotGrid
            rows="4"
            flow="column"
            gap="large"
            align="center"
            justify="center"
        >
            <PotLink size="tiny">Link</PotLink>
            <PotLink size="small">Link</PotLink>
            <PotLink size="medium">Link</PotLink>
            <PotLink size="large">Link</PotLink>

            <PotLink
                size="tiny"
                underline
            >
                Link
            </PotLink>
            <PotLink
                size="small"
                underline
            >
                Link
            </PotLink>
            <PotLink
                size="medium"
                underline
            >
                Link
            </PotLink>
            <PotLink
                size="large"
                underline
            >
                Link
            </PotLink>

            <PotLink
                size="tiny"
                active
            >
                Link
            </PotLink>
            <PotLink
                size="small"
                active
            >
                Link
            </PotLink>
            <PotLink
                size="medium"
                active
            >
                Link
            </PotLink>
            <PotLink
                size="large"
                active
            >
                Link
            </PotLink>

            <PotLink
                size="tiny"
                underline
                active
            >
                Link
            </PotLink>
            <PotLink
                size="small"
                underline
                active
            >
                Link
            </PotLink>
            <PotLink
                size="medium"
                underline
                active
            >
                Link
            </PotLink>
            <PotLink
                size="large"
                underline
                active
            >
                Link
            </PotLink>

            <PotLink
                size="tiny"
                disabled
                >Link</PotLink
            >
            <PotLink
                size="small"
                disabled
                >Link</PotLink
            >
            <PotLink
                size="medium"
                disabled
                >Link</PotLink
            >
            <PotLink
                size="large"
                disabled
                >Link</PotLink
            >

            <PotLink
                size="tiny"
                underline
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="small"
                underline
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="medium"
                underline
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="large"
                underline
                disabled
            >
                Link
            </PotLink>

            <PotLink
                size="tiny"
                active
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="small"
                active
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="medium"
                active
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="large"
                active
                disabled
            >
                Link
            </PotLink>

            <PotLink
                size="tiny"
                underline
                active
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="small"
                underline
                active
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="medium"
                underline
                active
                disabled
            >
                Link
            </PotLink>
            <PotLink
                size="large"
                underline
                active
                disabled
            >
                Link
            </PotLink>
        </PotGrid>
    </main>
</template>

<style>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
}
</style>
