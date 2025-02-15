<template>
    <main :class="$style.main">
        <PotForm
            :default-values="registrationForm"
            :validators="registrationFormValidators"
            :gap="[EGap.LARGE, EGap.BIG, EGap.MEDIUM, EGap.SMALL, EGap.TINY]"
            v-slot="$form"
            @change="registrationForm = $event"
        >
            <PotGrid>
                <h2>Регистрация</h2>

                <!-- Логие -->
                <PotFormField
                    :form="$form"
                    field="login"
                    v-slot="$field"
                >
                    <PotInputBase
                        :value="$form.values.login"
                        :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                        :invalid="$field.invalid"
                        placeholder="Логин"
                        @input="$field.change"
                    />
                </PotFormField>

                <!-- Пароль -->
                <PotFormField
                    :form="$form"
                    field="password"
                    v-slot="$field"
                >
                    <PotInputPassword
                        :value="$form.values.password"
                        :invalid="$field.invalid"
                        :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                        placeholder="Пароль"
                        @input="$field.change"
                    />
                </PotFormField>

                <!-- Телефон -->
                <PotFormField
                    :form="$form"
                    field="phone"
                    v-slot="$field"
                >
                    <PotInputMasked
                        :value="$form.values.phone"
                        :invalid="$field.invalid"
                        :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                        mask="+7 ### ### ##-##"
                        placeholder="Номер телефона"
                        @input="$field.change"
                    />
                </PotFormField>

                <!-- Пол -->
                <PotFormField
                    :form="$form"
                    field="sex"
                    v-slot="$field"
                >
                    <PotRadio
                        :value="$form.values.sex"
                        :specs="sex"
                        :invalid="$field.invalid"
                        :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                        value-name="id"
                        @change="$field.change"
                    />
                </PotFormField>

                <!-- Брак -->
                <PotFormField
                    :form="$form"
                    field="married"
                    v-slot="$field"
                >
                    <PotCheckbox
                        :value="$form.values.married"
                        :invalid="$field.invalid"
                        :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                        @change="$field.change"
                    >
                        В браке
                    </PotCheckbox>
                </PotFormField>

                <!-- Ментальное здоровье -->
                <PotFormField
                    :form="$form"
                    field="mentalHealth"
                    v-slot="$field"
                >
                    <PotSwitch
                        :value="$form.values.mentalHealth"
                        :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                        true-label="Я здоровый человек"
                        false-label="Я гей"
                        @change="$field.change"
                    />
                </PotFormField>

                <PotButton
                    :disabled="!$form.valid.value"
                    :size="[ESize.LARGE, ESize.BIG, ESize.MEDIUM, ESize.SMALL, ESize.TINY]"
                    @click="$form.validate"
                >
                    Зарегистрироваться
                </PotButton>
            </PotGrid>
        </PotForm>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Libraries
import * as yup from 'yup';
import { z } from 'zod';

// Components
import PotGrid from './components/grid/PotGrid.vue';
import PotInputBase from './components/input/PotInputBase.vue';
import PotButton from './components/button/PotButton.vue';
import PotInputPassword from './components/input/PotInputPassword.vue';
import PotInputMasked from './components/input/PotInputMasked.vue';
import PotRadio from './components/radio/PotRadio.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotForm from './components/form/PotForm.vue';
import PotFormField from './components/form/PotFormField.vue';
import PotSwitch from './components/switch/PotSwitch.vue';
import { ESize } from './enums/config';
import { EGap } from './enums/components/EGap';

interface IRegistrationForm {
    login: string;
    password: string;
    phone: string;
    sex: 'male' | 'female' | null;
    married: boolean;
    mentalHealth: boolean;
}

const registrationForm = ref<IRegistrationForm>({
    login: '',
    password: '',
    phone: '',
    sex: 'female',
    married: false,
    mentalHealth: true,
});

const registrationFormValidators = {
    login: yup.string().required('Обязательное поле').min(5, 'Логин должен быть длинее 5 символов'),
    password: z.string().min(10, 'Пароль должен быть длинее 10 символов'),
    married: yup.bool().not([false], 'Ты должен жениться!'),
    sex: yup.string().not(['female'], 'Неверный пол'),
    mentalHealth: yup.bool().not([false], 'Лечись!'),
};

const sex = ref([
    { id: 'male', label: 'Мужской' },
    { id: 'female', label: 'Женский' },
]);
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
