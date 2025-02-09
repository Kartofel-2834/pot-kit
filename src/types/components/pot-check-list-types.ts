// Types
import type { ISpecsHelperOptions, TSpecValue } from '@/types/composables/specs-helper-types';

// Enums
import { EColorTheme, ESize } from '@/enums/config';
import { ERadius } from '@/enums/components';

/**
 * Интерфейс пропсов для компонента PotCheckList
 */
export interface IPotCheckListProps extends ISpecsHelperOptions {
    /** HTML-тег чек-листа. По умолчанию - 'div' */
    tag?: string;

    /** Список выбранных значений */
    value?: TSpecValue[];

    /** То же, что и `value`, добавлен для поддержки v-model */
    modelValue?: TSpecValue[];

    /** Если true, то список будет заблокирован и не активен */
    disabled?: boolean;

    /** Если true, то в начале списка появится чекбокс для выбора и сброса всех значений сразу */
    resetable?: boolean;

    /** Цвет чекбоксов в списке */
    color?: EColorTheme | EColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: ESize | ESize[] | null;

    /** Радиус границ чекбокса */
    radius?: ERadius | ERadius[] | null;
}