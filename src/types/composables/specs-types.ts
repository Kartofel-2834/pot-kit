// Types
import type { ComputedRef } from 'vue';

export type TSpecValue = string | number | boolean | null;

/** Модифицированный спек с состоянием */
export type TModifiedSpec<
    S extends object | TSpecValue,
    V extends (S extends object ? keyof S : string),
    T extends (V extends keyof S ? S[V] : S) 
> = {
    target: S;
    value: T | null;
    label: string;
    isDisabled: boolean;
    isSelected: boolean;
};

export interface ISpecsProps<
    S extends object | TSpecValue,
    L extends (S extends object ? keyof S : string),
    V extends (S extends object ? keyof S : string),
    T extends (V extends keyof S ? S[V] : S) 
> {
    /** Массив объектов или значений доступных для выбора и называемых спеками */
    specs?: S[];

    /** Массив значений спеков доступных для выбора, если есть спек значения, которого нет в `facets`, то он будет задизейблен */
    facets?: T[] | null;

    /** Значение выбранного спека */
    value?: T | T[] | null;

    /** Значение выбранного спека */
    modelValue?: T | T[] | null;

    /** Ключ по которому будет извлекаться label из спека, если спек объект */
    labelName?: L;

    /** Ключ по которому будет извлекаться значение из спека, если спек объект */
    valueName?: V;

    /** Дефолтный label для null-спека */
    resetLabel?: string;

    /** label для true значений-спеков */
    trueLabel?: string;

    /** label для false значений-спеков */
    falseLabel?: string;
}

export type TSpecs<
    S extends object | TSpecValue,
    V extends (S extends object ? keyof S : string),
    T extends (V extends keyof S ? S[V] : S) 
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
    getModifiedSpecs(specsArg?: S[]): TModifiedSpec<S, V, T>[];
};