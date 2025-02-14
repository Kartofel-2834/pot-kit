// Types
import type { ComputedRef } from 'vue';

export type TSpecValue = string | number | boolean;

/** Модифицированный спек с состоянием */
export type TModifiedSpec<T extends TSpecValue, U> = {
    target: U;
    value: T;
    label: string;
    isDisabled: boolean;
    isSelected: boolean;
};

export type TSpecBase<
    T extends TSpecValue,
    L extends string = 'label',
    V extends string = 'value'
> = {
    [key in L | V]: key extends V ? T : string;
}

/** Спек */
export type TSpec<
    T extends TSpecValue,
    L extends string = 'label',
    V extends string = 'value'
> = TSpecBase<T, L, V> & {
    [key: string]: unknown
} 

/**
 * Интерфейс пропсов для компонентов использующих фасетный поиск
 */
export interface ISpecsProps<
    T extends TSpecValue,
    L extends string,
    V extends string,
    S extends T | TSpec<T, L, V>
> {
    /** Массив объектов или значений доступных для выбора и называемых спеками */
    specs?: S[];

    /** Массив значений спеков доступных для выбора, если есть спек значения, которого нет в `facets`, то он будет задизейблен */
    facets?: T[] | null;

    /** Значение выбранного спека */
    value?: T | T[] | null;

    /**
     * То же, что и `value`, добавлен для удобства использования
     * компосабла в компонентах поддерживающих v-model
    */
    modelValue?: T | T[] | null;

    /** Ключ по которому будет извлекаться label из спека, если спек объект */
    labelName?: L;

    /** Ключ по которому будет извлекаться значение из спека, если спек объект */
    valueName?: V;
}

/**
 * Интерфейс options компосабла для фасетного поиска
 */
export interface ISpecsHelperOptions<
    T extends TSpecValue,
    L extends string,
    V extends string,
    S extends T | TSpec<T, L, V>
> extends ISpecsProps<T, L, V, S> {
    /** Дефолтный label для true-спека */
    trueLabel?: string;

    /** Дефолтный label для false-спека */
    falseLabel?: string;

    /** Дефолтный label для null-спека */
    resetLabel?: string;
}

export type TSpecsHelper<
    T extends TSpecValue,
    L extends string,
    V extends string,
    S extends T | TSpec<T, L, V>
> = {

    /** Выбранное значение */
    currentValue: ComputedRef<T | T[] | null>;

    /** Проверяет, задизейблен ли спек */
    checkIsDisabled(spec: S): boolean;

    /** Проверяет, выбран ли спек */
    checkIsSelected(spec: S): boolean;

    /** Проверяет, валидно ли значение спека */
    checkIsValueValid(possibleValue: unknown): boolean;

    /** Возвращает значение спека */
    getSpecValue(spec: S): T | null;

    /** Возвращает label спека */
    getSpecLabel: (spec: S) => string;

    /** Возвращает выбранный спек */
    getCurrentSpec(): S | null;

    /** Возвращает спеки с их текущим состоянием */
    getModifiedSpecs(specsArg?: S[]): TModifiedSpec<T, S>[];
};
