<template>
    <main :class="$style.main">
        <PotForm
            :default-values="registrationForm"
            :validators="registrationFormValidators"
            v-slot="$form"
            @change="registrationForm = $event"
        >
            <PotGrid
                :size="['large', 'small', 'tiny']"
                :gap="['medium', 'small', 'tiny']"
                :devices="['desktop', 'tablet', 'mobile']"
            >
                <!-- Оба варианта отрабатывают как надо -->
                <PotCheckbox v-model="flag">Flag</PotCheckbox>

                <PotButton :disabled="flag"> A </PotButton>

                <PotTooltip text="Test">
                    <PotButton :disabled="flag"> B </PotButton>
                </PotTooltip>

                Selected job: {{ $form.values.job }}

                <PotRadio
                    v-model="$form.values.job"
                    :specs="jobsList"
                    value-name="id"
                >
                    <template #radio="{ active, label, value, onChange }">
                        <!-- Тут у тултипа текст меняется, что нормально -->
                        <PotTooltip :text="`${value}-${active}`">
                            <!--
                                Активная кнопка не дизейблится,
                                тут багулина, которую не могу поправить
                            -->
                            <button :disabled="active">Test</button>

                            <PotButton
                                :disabled="active"
                                @click="onChange"
                            >
                                {{ label }} {{ active }}
                            </PotButton>
                        </PotTooltip>
                    </template>
                </PotRadio>

                <!-- Это тоже работает, активная кнопка дизейблится -->
                <PotRadio
                    v-model="$form.values.job"
                    :specs="jobsList"
                    value-name="id"
                >
                    <template #radio="{ active, label, onChange }">
                        <PotButton
                            :disabled="active"
                            @click="onChange"
                        >
                            {{ label }} {{ active }}
                        </PotButton>
                    </template>
                </PotRadio>
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
import PotInputBase from './components/input/PotInputBase.vue';
import PotButton from './components/button/PotButton.vue';
import PotInputPassword from './components/input/PotInputPassword.vue';
import PotInputMasked from './components/input/PotInputMasked.vue';
import PotRadio from './components/radio/PotRadio.vue';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotForm from './components/form/PotForm.vue';
import PotFormField from './components/form/PotFormField.vue';
import PotSwitch from './components/switch/PotSwitch.vue';
import PotTooltip from './components/tooltip/PotTooltip.vue';
import type { TDeviceIs } from './types/composables';

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
