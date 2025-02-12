<template>
    <main :class="$style.main">
        <div style="display: flex; flex-direction: column; gap: 2rem"></div>

        <PotGrid>
            <div>
                {{ form.fullErrors }}
            </div>

            <PotInputBase
                :value="form.values.login"
                placeholder="Login"
                @input="form.change('login', $event)"
            />

            <PotInputPassword
                :value="form.values.password"
                placeholder="Password"
                @input="form.change('password', $event)"
            />

            <PotGridCell :devices="[EDevice.DESKTOP, EDevice.MOBILE]">
                <PotInputMasked
                    :value="form.values.phone"
                    placeholder="Phone"
                    mask="+7 ### ### ##-##"
                    @input="form.change('phone', $event)"
                />
            </PotGridCell>

            <PotRadio
                v-model="ilmu"
                :size="ESize.MEDIUM"
                :specs="[1, 2, 3]"
            >
            </PotRadio>

            <PotGridCell :devices="[EDevice.DESKTOP, EDevice.MOBILE]">
                <PotTooltip
                    text="Кто нажмет тот ЛОХ"
                    :position="ETooltipPosition.RIGHT_CENTER"
                    :size="ESize.TINY"
                    fixed
                >
                    <PotButton
                        style="width: 100%"
                        @click="form.validate"
                    >
                        Submit
                    </PotButton>
                </PotTooltip>
            </PotGridCell>
        </PotGrid>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Enums
import { EColorTheme, EDevice, ESize } from './enums/config';

// Components
import PotGrid from './components/grid/PotGrid.vue';
import PotInputBase from './components/input/PotInputBase.vue';
import PotGridCell from './components/grid/PotGridCell.vue';
import PotButton from './components/button/PotButton.vue';
import PotInputPassword from './components/input/PotInputPassword.vue';
import PotTooltip from './components/tooltip/PotTooltip.vue';
import { ETooltipPosition } from './enums/components';
import PotInputMasked from './components/input/PotInputMasked.vue';
import PotRadio from './components/radio/PotRadio.vue';
import { useForm } from './composables/form';

import * as yup from 'yup';
import { z } from 'zod';

const form = useForm(
    {
        login: '',
        password: '',
        phone: '',
        age: 1,
    },
    {
        login: yup.string().required('Kamal is required').min(5),
        password: z.string().min(5),
    },
);

const flag = ref<boolean>(true);
const ilmu = ref<number | null>(-123);
const kamal = ref<string>('');
const kurban = ref<HTMLElement | null>(null);
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
}
</style>
