// Types
import type { ComputedRef } from 'vue';

export type TSpecValue = string | number | boolean | null;

/** Тип для спека, может быть объектом или простым значением */
export type TSpec = Record<string, unknown> | TSpecValue;

/** Модифицированный спек с состоянием */
export type TModifiedSpec<
    T extends TSpecValue,
    U extends TSpec = TSpecValue
> = {
    target: U;
    value: T;
    label: string;
    isDisabled: boolean;
    isSelected: boolean;
};

/**
 * Интерфейс пропсов для компонентов использующих фасетный поиск
 */
export interface ISpecsProps<T extends TSpecValue, U extends TSpec = TSpecValue> {
    /** Массив объектов или значений доступных для выбора и называемых спеками */
    specs?: U[];

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
    labelName?: U extends object ? keyof U : undefined;

    /** Ключ по которому будет извлекаться значение из спека, если спек объект */
    valueName?: U extends object ? keyof U : undefined;
}

/**
 * Интерфейс options компосабла для фасетного поиска
 */
export interface ISpecsHelperOptions<
    T extends TSpecValue,
    U extends TSpec = TSpecValue
> extends ISpecsProps<T, U> {
    /** Дефолтный label для true-спека */
    trueLabel?: string;

    /** Дефолтный label для false-спека */
    falseLabel?: string;

    /** Дефолтный label для null-спека */
    resetLabel?: string;
}

export type TSpecsHelper<
    T extends TSpecValue,
    U extends TSpec = TSpecValue
> = {
    /** Выбранное значение */
    currentValue: ComputedRef<T | T[] | null>;

    /** Проверяет, задизейблен ли спек */
    checkIsDisabled(spec: U): boolean;

    /** Проверяет, выбран ли спек */
    checkIsSelected(spec: U): boolean;

    /** Проверяет, валидно ли значение спека */
    checkIsValueValid(possibleValue: unknown): TSpecValue | undefined;

    /** Возвращает значение спека */
    getSpecValue(spec: U): T | null;

    /** Возвращает label спека */
    getSpecLabel: (spec: U) => string;

    /** Возвращает выбранный спек */
    getCurrentSpec(): U | null;

    /** Возвращает спеки с их текущим состоянием */
    getModifiedSpecs(specsArg?: U[]): TModifiedSpec<T, U>[];
};
