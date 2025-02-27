<template>
    <main :class="$style.main">
        <PotForm
            :default-values="registrationForm"
            :validators="registrationFormValidators"
            v-slot="$form"
        >
            <PotGrid>
                {{ $form.values }}

                <PotFormField
                    :form="$form"
                    field="login"
                    v-slot="$field"
                >
                    <PotInputBase
                        v-model="$form.values.login"
                        placeholder="Login"
                        @blur="$field.toggle"
                    />
                </PotFormField>

                <PotFormField
                    :form="$form"
                    field="password"
                    v-slot="$field"
                >
                    <PotInputPassword
                        v-model="$form.values.password"
                        placeholder="Password"
                        @blur="$field.change"
                    />
                </PotFormField>

                <PotButton
                    :disabled="!$form.valid.value"
                    @click="$form.validate"
                >
                    Submit
                </PotButton>
            </PotGrid>
        </PotForm>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { inject, ref } from 'vue';

// Libraries
import * as yup from 'yup';
import { z } from 'zod';

// Components
import PotGrid from './components/grid/PotGrid.vue';
import PotRadio from './components/radio/PotRadio.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotForm from './components/form/PotForm.vue';
import PotTooltip from './components/tooltip/PotTooltip.vue';
import PotSwitch from './components/switch/PotSwitch.vue';
import type { TDeviceIs } from './types/composables';
import PotInputMasked from './components/input/PotInputMasked.vue';
import { removeMask, useMask } from './composables/mask';
import PotInputBase from './components/input/PotInputBase.vue';
import PotFormField from './components/form/PotFormField.vue';
import PotInputPassword from './components/input/PotInputPassword.vue';
import PotButton from './components/button/PotButton.vue';

interface IRegistrationForm {
    login: string;
    password: string;
    phone: string;
    job: 'director' | 'manager' | null;
    married: boolean;
    mentalHealth: boolean;
}

const registrationForm = ref<IRegistrationForm>({
    login: '',
    password: '',
    phone: '',
    job: 'director',
    married: false,
    mentalHealth: true,
});

const registrationFormValidators = {
    login: yup.string().required('Обязательное поле').min(5, 'Логин должен быть длинее 5 символов'),
    password: z.string().min(10, 'Пароль должен быть длинее 10 символов'),
    married: yup.bool().not([false], 'Ты должен жениться!'),
    mentalHealth: yup.bool().not([false], 'Лечись!'),
};

const jobsList = ref([
    { id: 'director', label: 'Director' },
    { id: 'manager', label: 'Manager' },
]);

const flag = ref(false);

const kamal = ref<string>('');

const $deviceIs = inject<TDeviceIs>('deviceIs');
</script>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
</style>
