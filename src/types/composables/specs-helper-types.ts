// Types
import type { ComputedRef } from 'vue';

export type SpecValue = string | number | boolean | null;

/**
 * Тип для спека, может быть объектом или простым значением
 */
export type Spec = Record<string, unknown> | SpecValue;

/**
 * Модифицированный спек с состоянием
 */
export type ModifiedSpec = {
    target: Spec;
    value: SpecValue;
    label: string;
    isDisabled: boolean;
    isSelected: boolean;
};

/**
 * Интерфейс пропсов для компонентов использующих фасетный поиск
 *
 * @property {Spec[]} [specs] - Массив объектов или значений доступных для выбора и называемых спеками
 * @property {SpecValue[] | null} [facets] - Массив значений спеков доступных для выбора, если есть спек значения
 *                                           которого нет в `facets`, то он будет задизейблен
 * @property {SpecValue} [value] - Значение выбранного спека
 * @property {SpecValue} [modelValue] - То же, что и `value`, добавлен для удобства использования
 *                                      компосабла в компонентах поддерживающих v-model
 * @property {string} [labelName] - ключ по которому будет извлекаться label из спека, если спек объект.
 * @property {string} [valueName] - ключ по которому будет извлекаться значение из спека, если спек объект.
 */
export interface ISpecsProps {
    specs?: Spec[];
    facets?: SpecValue[] | null;
    value?: SpecValue | SpecValue[];
    modelValue?: SpecValue | SpecValue[];
    labelName?: string;
    valueName?: string;
}

/**
 * Интерфейс options компосабла для фасетного поиска
 *
 * @property {string} [trueLabel] - дефолтный label для true-спека
 * @property {string} [falseLabel] - дефолтный label для false-спека
 * @property {string} [resetLabel] - дефолтный label для null-спека
 *
 * @remark Расширяет интерфейс `ISpecsProps`
 */
export interface ISpecsHelperOptions extends ISpecsProps {
    trueLabel?: string;
    falseLabel?: string;
    resetLabel?: string;
}

export type SpecsHelper = {
    /**
     * Выбранное значение
     */
    currentValue: ComputedRef<SpecValue | SpecValue[]>;

    /**
     * Проверяет, задизейблен ли спек.
     */
    checkIsDisabled(spec: Spec): boolean;

    /**
     * Проверяет, выбран ли спек.
     */
    checkIsSelected(spec: Spec): boolean;

    /**
     * Проверяет, валидно ли значение спека.
     */
    checkIsValueValid(possibleValue: unknown): boolean;

    /**
     * Возвращает значение спека.
     */
    getSpecValue(spec: Spec): SpecValue;

    /**
     * Возвращает label спека.
     */
    getSpecLabel: (spec: Spec) => string;

    /**
     * Возвращает выбранный спек.
     */
    getCurrentSpec(): Spec;

    /**
     * Возвращает спеки с их текущим состоянием
     */
    getModifiedSpecs(specsArg?: Spec[]): ModifiedSpec[];
};
