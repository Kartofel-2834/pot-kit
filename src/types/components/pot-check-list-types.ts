// Types
import type { ISpecsHelperOptions, SpecValue } from '@/types/composables/specs-helper-types';

// Enums
import { EColorTheme } from '@/enums/config';
import { ESize } from '@/enums/components';

/**
 * Интерфейс пропсов для компонента PotCheckList
 */
export interface IPotCheckListProps extends ISpecsHelperOptions {
    /** HTML-тег чек-листа. По умолчанию - 'div' */
    tag?: string;

    /** Список выбранных значений */
    value?: SpecValue[];

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: SpecValue[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то в начале списка появится чекбокс для выбора и сброса всех значений сразу */
    resetable?: boolean;

    /** Цвет чекбоксов в списке */
    color?: EColorTheme | EColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: ESize | ESize[] | null;
}