// Types
import type {
    SpecsHelper,
    ISpecsHelperOptions,
    Spec,
    SpecValue,
    ModifiedSpec,
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
export function useSpecsHelper({
    specs = [],
    facets = null,
    value = null,
    modelValue = null,
    labelName = 'label',
    valueName = 'value',

    trueLabel = 'Да',
    falseLabel = 'Нет',
    resetLabel = 'Все',
}: ISpecsHelperOptions): SpecsHelper {
    const currentValue = computed<SpecValue | SpecValue[]>(() => value ?? modelValue);

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
    function checkIsDisabled(spec: Spec): boolean {
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
    function checkIsSelected(spec: Spec): boolean {
        if (checkIsDisabled(spec)) return false;

        const value = getSpecValue(spec);

        if (!Array.isArray(currentValue.value)) return value === currentValue.value;

        return currentValue.value.includes(value);
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
            ['string', 'number', 'boolean'].includes(typeof possibleValue) || possibleValue === null
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
    function getSpecValue(spec: Spec): SpecValue {
        if (checkIsValueValid(spec)) return spec as SpecValue;

        if (typeof spec !== 'object' || spec === null) return null;

        if (!checkIsValueValid(spec[valueName])) return null;

        return spec[valueName] as SpecValue;
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
    function getSpecLabel(spec: Spec): string {
        if (['string', 'number'].includes(typeof spec)) return `${spec}`;

        if (typeof spec === 'boolean') return spec ? trueLabel : falseLabel;

        if (spec === null) return resetLabel;

        if (typeof spec !== 'object' || !checkIsValueValid(spec[labelName])) return '';

        return getSpecLabel(spec[labelName] as SpecValue);
    }

    /**
     * Хелпер-функция для получения выбранного спека
     */
    function getCurrentSpec(): Spec {
        return specs.find(checkIsSelected) || null;
    }

    /**
     * Хелпер-функция для получения спеков с состоянием
     *
     * @param specsArg - спеки, которые будут обновлены
     *
     * @returns Список обновленных спеков с состоянием.
     */
    function getModifiedSpecs(specsArg = specs): ModifiedSpec[] {
        return specsArg.map(spec => ({
            target: spec,
            value: getSpecValue(spec),
            label: getSpecLabel(spec),
            isDisabled: checkIsDisabled(spec),
            isSelected: checkIsSelected(spec),
        }));
    }

    return {
        currentValue,
        checkIsDisabled,
        checkIsSelected,
        checkIsValueValid,
        getSpecValue,
        getSpecLabel,
        getCurrentSpec,
        getModifiedSpecs,
    };
}
