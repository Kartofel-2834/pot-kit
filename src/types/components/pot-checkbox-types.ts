// Types
import type { ISpecsHelperOptions, SpecValue } from '@/types/composables/specs-helper-types';

/**
 * Допустимый value для компонента PotCheckbox
 */
export type CheckboxValue = string | number | boolean | null;

/**
 * Интерфейс пропсов для компонента PotCheckList
 */
export interface IPotCheckListProps extends ISpecsHelperOptions {
    /**
     * HTML-тег чек-листа. По умолчанию - 'div'
     */
    tag?: string;

    /**
     * Список выбранных значений
     */
    value?: SpecValue[];

    /**
     * То же, что и `value`, добавлен для поддержки v-model
     */
    modelValue?: SpecValue[];

    /**
     * Если true, то список будет заблокирован и не активен
     */
    disabled?: boolean;

    /**
     * Если true, то в начале списка появится чекбокс для выбора и сброса всех значений сразу
     */
    resetable?: boolean;
}

/**
 * Интерфейс пропсов для компонента PotCheckbox
 */
export interface IPotCheckboxProps {
    /**
     * текущее значение чекбокса
     */
    value?: CheckboxValue;

    /**
     * текущее значение чекбокса
     */
    modelValue?: CheckboxValue;

    /**
     * если чекбокс в состоянии checked, то value = trueValue
     */
    trueValue?: CheckboxValue;

    /**
     * если чекбокс не в состоянии checked, то value = falseValue
     */
    falseValue?: CheckboxValue;

    /**
     * Если true, то чекбокс будет задизейблен
     */
    disabled?: boolean;

    /**
     * иконка в чекбоксе, галочка по-умолчанию
     */
    icon?: string;

    /**
     * цвет чекбокса
     */
    color?: string;

    /**
     * точки останова для адаптивного дизайна
     */
    breakpoints?: string | string[];
}
