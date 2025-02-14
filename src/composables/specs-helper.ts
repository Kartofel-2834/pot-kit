// Types
import type {
    TSpecsHelper,
    ISpecsHelperOptions,
    TSpecValue,
    TModifiedSpec,
    TSpec,
} from '@/types/composables';

// Vue
import { computed } from 'vue';

/**
 * Компосабл возвращающий набор методов для упрощения реализации фасетного поиска.
 *
 * @param options - Объект, содержащий следующие свойства:
 * @param [options.specs=[]] - Массив объектов или значений доступных для выбора и называемых спеками
 * @param [options.facets=null] - Массив значений спеков доступных для выбора, если есть спек значения
 *                                которого нет в `facets`, то он будет задизейблен
 * @param [options.value=null] - Значение выбранного спека
 * @param [options.modelValue=null] - То же, что и `value`, добавлен для удобства использования
 *                                    компосабла в компонентах поддерживающих v-model
 * @param [options.labelName='label'] - ключ по которому будет извлекаться label из спека, если спек объект.
 * @param [options.valueName='value'] - ключ по которому будет извлекаться значение из спека, если спек объект.
 *
 * @returns Объект включающий currentValue и следующие методы для простой работы с спеками:
 * - checkIsDisabled - проверяет, задизейблен ли спек.
 * - checkIsSelected - проверяет, выбран ли спек.
 * - checkIsValueValid - проверяет, валидно ли значение спека.
 * - getSpecValue - возвращает значение спека.
 * - getSpecLabel - возвращает label спека.
 * - getCurrentSpec - возвращает выбранный спек.
 * - getModifiedSpecs - возвращает спеки с их текущим состоянием
 */
export function useSpecsHelper<
    T extends TSpecValue,
    L extends string,
    V extends string,
    S extends T | TSpec<T, L, V>
>({
    specs = [],
    facets = null,
    value = null,
    modelValue = null,
    labelName = 'label' as L,
    valueName = 'value' as V,

    trueLabel = 'Да',
    falseLabel = 'Нет',
    resetLabel = 'Все',
}: ISpecsHelperOptions<T, L, V, S>): TSpecsHelper<T, L, V, S> {
    const currentValue = computed<T | T[] | null>(() => value ?? modelValue);

    /**
     * Хелпер-функция для определения, задизейблен ли спек.
     *
     * @param spec - Спецификация для проверки на дизейбл.
     *
     * @returns Логическое значение, указывающее на то задизейблен ли спек.
     *
     * @description
     * Дизейбл спеков проверяется по наличию их значения в `facets`.
     * Если значения спека нет в `facets`, то он задизейблен.
     * Проверку по наличию в `facets` можно отключить передав в `facets` null.
     */
    function checkIsDisabled(spec: S): boolean {
        if (facets === null) return false;

        const specValue = getSpecValue(spec);

        if (specValue === null) return true;

        return !facets.includes(specValue);
    }

    /**
     * Хелпер-функция для определения, выбран ли спек.
     *
     * @param spec - Спек для проверки.
     *
     * @returns Логическое значение, указывающее на то выбран спек или нет.
     */
    function checkIsSelected(spec: S): boolean {
        if (checkIsDisabled(spec)) return false;

        const value = getSpecValue(spec);

        if (!Array.isArray(currentValue.value)) return value === currentValue.value;

        return value !== null && currentValue.value.includes(value);
    }

    /**
     * Хелпер-функция для проверки, является ли значение спека допустимым.
     *
     * @param possibleValue - проверяемое значение спека.
     * @returns Логическое значение, указывающее, является ли значение спека допустимым.
     *
     * @description функция используется в основном для определения является ли сам спек значением
     * или же значение нужно извлечь из него по ключу `valueName`
     */
    function checkIsValueValid(possibleValue: unknown): boolean {
        return (
            ['string', 'number', 'boolean'].includes(typeof possibleValue) ||
            possibleValue === null
        );
    }

    /**
     * Хелпер-функция для получения значения спека.
     *
     * @param spec - Спек, из которого необходимо получить значение.
     *
     * @returns
     * - Если `spec` является действительным значением (строкой, числом, логическим значением или null), оно возвращается как есть.
     * - Если `spec` является объектом и содержит действительное значение, она рекурсивно вызывается с этим значением.
     * - Если ни одно из вышеперечисленных условий не выполняется, возвращается null.
     */
    function getSpecValue(spec: S): T | null {
        const isSpecAValue = checkIsValueValid(spec);

        if (isSpecAValue) {
            return spec as T;
        } 

        if (typeof spec !== 'object' || spec === null) return null;

        const value = (spec as TSpec<T, L, V>)[valueName];

        if (!checkIsValueValid(value)) return null;

        return value as T;
    }

    /**
     * Хелпер-функция для получения label спека.
     *
     * @param spec - Спек, для которого необходимо получить label.
     *
     * @returns
     * Эта функция проверяет тип спека и возвращает соответствующий label на основе следующих правил:
     * - Если `spec` является строкой или числом, он возвращается как строка.
     * - Если `spec` является логическим значением, возвращается `trueLabel` или `falseLabel` соответственно.
     * - Если `spec` равен null, возвращается `resetLabel`.
     * - Если `spec` является объектом, то получаем значение по `labelName` и применяем к нему первые 3 пункта.
     * - Если ни одно из вышеперечисленных условий не выполняется, возвращается пустая строка.
     */
    function getSpecLabel(spec: unknown): string {
        if (['string', 'number'].includes(typeof spec)) return `${spec}`;

        if (typeof spec === 'boolean') return spec ? trueLabel : falseLabel;

        if (spec === null) return resetLabel;

        if (typeof spec !== 'object') return '';

        const label = (spec as TSpec<T, L, V>)[labelName]; 

        return getSpecLabel(label);
    }


    /**
     * Хелпер-функция для получения выбранного спека
     */
    function getCurrentSpec(): S | null {
        return specs.find(checkIsSelected) || null;
    }

    /**
     * Хелпер-функция для получения спеков с состоянием
     *
     * @param specsArg - спеки, которые будут обновлены
     *
     * @returns Список обновленных спеков с состоянием.
     */
    function getModifiedSpecs(specsArg = specs): TModifiedSpec<T, S>[] {
        return specsArg.map(spec => ({
            target: spec,
            value: getSpecValue(spec) as T,
            label: getSpecLabel(spec),
            isDisabled: checkIsDisabled(spec),
            isSelected: checkIsSelected(spec),
        }));
    }

    return {
        currentValue: currentValue,
        checkIsDisabled,
        checkIsSelected,
        checkIsValueValid,
        getSpecValue,
        getSpecLabel,
        getCurrentSpec,
        getModifiedSpecs,
    };
}
