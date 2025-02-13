<template>
    <main :class="$style.main">
        <PotForm
            :default-values="tazhu"
            :validators="tazhuValidators"
            v-slot="$form"
            strict
        >
            <PotGrid>
                <PotInputBase
                    v-model="$form.values.login"
                    placeholder="Login"
                    @blur="$form.toggle('login')"
                />

                <PotInputPassword
                    :value="$form.values.password"
                    placeholder="password"
                    @input="$form.change('password', $event)"
                />

                <PotInputMasked
                    :value="$form.values.phone"
                    mask="+7 ### ### ##-##"
                    placeholder="phone"
                    @input="$form.change('phone', $event)"
                />

                <PotButton @click="$form.validate"> Submit </PotButton>
            </PotGrid>
        </PotForm>
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
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotSwitch from './components/switch/PotSwitch.vue';
import PotForm from './components/form/PotForm.vue';
import { errorMessages } from 'vue/compiler-sfc';

const tazhu = {
    login: '',
    password: '',
    phone: '',
    age: 1,
};

const tazhuValidators = {
    login: yup.string().required('Kamal is required').min(5),
    password: z.string().min(5),
};

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
}
</style>
