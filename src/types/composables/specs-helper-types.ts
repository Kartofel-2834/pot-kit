// Types
import type { ComputedRef } from 'vue';

export type TSpecValue = string | number | boolean | null;

/** Тип для спека, может быть объектом или простым значением */
export type TSpec = Record<string, unknown> | TSpecValue;

/** Модифицированный спек с состоянием */
export type TModifiedSpec = {
    target: TSpec;
    value: TSpecValue;
    label: string;
    isDisabled: boolean;
    isSelected: boolean;
};

/**
 * Интерфейс пропсов для компонентов использующих фасетный поиск
 *
 * @property {TSpec[]} [specs] - 
 * @property {TSpecValue[] | null} [facets] - 
 *                                           
 * @property {TSpecValue} [value] - Значение выбранного спека
 * @property {TSpecValue} [modelValue] - То же, что и `value`, добавлен для удобства использования
 *                                      
 * @property {string} [labelName] - ключ по которому будет извлекаться label из спека, если спек объект.
 * @property {string} [valueName] - ключ по которому будет извлекаться значение из спека, если спек объект.
 */
export interface ISpecsProps {
    /** Массив объектов или значений доступных для выбора и называемых спеками */
    specs?: TSpec[];

    /** Массив значений спеков доступных для выбора, если есть спек значения, которого нет в `facets`, то он будет задизейблен */
    facets?: TSpecValue[] | null;

    /** Значение выбранного спека */
    value?: TSpecValue | TSpecValue[];

    /**
     * То же, что и `value`, добавлен для удобства использования
     * компосабла в компонентах поддерживающих v-model
    */
    modelValue?: TSpecValue | TSpecValue[];

    /** Ключ по которому будет извлекаться label из спека, если спек объект */
    labelName?: string;

    /** Ключ по которому будет извлекаться значение из спека, если спек объект */
    valueName?: string;
}

/**
 * Интерфейс options компосабла для фасетного поиска
 */
export interface ISpecsHelperOptions extends ISpecsProps {
    /** Дефолтный label для true-спека */
    trueLabel?: string;

    /** Дефолтный label для false-спека */
    falseLabel?: string;

    /** Дефолтный label для null-спека */
    resetLabel?: string;
}

export type TSpecsHelper = {
    /** Выбранное значение */
    currentValue: ComputedRef<TSpecValue | TSpecValue[]>;

    /** Проверяет, задизейблен ли спек */
    checkIsDisabled(spec: TSpec): boolean;

    /** Проверяет, выбран ли спек */
    checkIsSelected(spec: TSpec): boolean;

    /** Проверяет, валидно ли значение спека */
    checkIsValueValid(possibleValue: unknown): boolean;

    /** Возвращает значение спека */
    getSpecValue(spec: TSpec): TSpecValue;

    /** Возвращает label спека */
    getSpecLabel: (spec: TSpec) => string;

    /** Возвращает выбранный спек */
    getCurrentSpec(): TSpec;

    /** Возвращает спеки с их текущим состоянием */
    getModifiedSpecs(specsArg?: TSpec[]): TModifiedSpec[];
};
