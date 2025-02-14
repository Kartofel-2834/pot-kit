<template>
    <main :class="$style.main">
        <PotForm
            :default-values="tazhu"
            :validators="tazhuValidators"
            v-slot="$form"
            strict
            @change="tazhu = $event"
        >
            <PotGrid>
                <!-- Login -->
                <PotFormField
                    :form="$form"
                    field="login"
                    v-slot="$field"
                >
                    <PotInputBase
                        :value="$form.values.login"
                        placeholder="Login"
                        @input="$field.change"
                    />
                </PotFormField>

                <!-- Password -->
                <PotFormField
                    :form="$form"
                    field="password"
                    v-slot="$field"
                >
                    <PotInputPassword
                        v-model="$form.values.password"
                        placeholder="password"
                        @blur="$field.toggle"
                    />
                </PotFormField>

                <!-- Phone -->
                <PotFormField
                    :form="$form"
                    field="phone"
                    v-slot="$field"
                >
                    <PotInputMasked
                        :value="$form.values.phone"
                        mask="+7 ### ### ##-##"
                        placeholder="phone"
                        @input="$field.change"
                    />
                </PotFormField>

                <!-- Married -->
                <PotFormField
                    :form="$form"
                    field="married"
                    v-slot="$field"
                >
                    <PotCheckbox
                        :value="$form.values.married"
                        :invalid="!$field.valid"
                        @change="$field.change"
                    >
                        Kamal {{ $field.error?.message }}
                    </PotCheckbox>
                </PotFormField>

                <!-- Age -->
                {{ $form.values }}
                <PotFormField
                    :form="$form"
                    field="age"
                    v-slot="$field"
                >
                    <PotRadio
                        :value="$form.values.age"
                        :specs="[
                            { value: 1, label: 'adun' },
                            { value: 2, label: 'daun' },
                        ]"
                        invalid
                        value-name="label"
                        @change="$field.change"
                    />
                </PotFormField>

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
import { boolean, z } from 'zod';
import PotCheckbox from './components/check/PotCheckbox.vue';
import PotSwitch from './components/switch/PotSwitch.vue';
import PotForm from './components/form/PotForm.vue';
import PotFormField from './components/form/PotFormField.vue';
import { EGap } from './enums/components/EGap';

const tazhu = ref({
    login: '',
    password: '',
    phone: '',
    age: 1,
    married: false,
});

const tazhuValidators = {
    login: yup.string().required('Kamal is required').min(5),
    password: z.string().min(5),
    married: yup.bool().not([false], 'You must be married'),
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
    min-height: 100vh;
}
</style>
