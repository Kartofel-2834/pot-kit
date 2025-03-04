// Types
import type {
    TSpecsHelper,
    TSpecValue,
    TModifiedSpec,
    ISpecsProps,
} from '@/types/composables';

// Vue
import { computed } from 'vue';

// TODO: Переработать систему типов спек хелпера и добавить поддержку примитивных спеков

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
    S extends object,
    L extends keyof S,
    V extends keyof S,
    T extends S[V] & TSpecValue
>({
    specs = [],
    facets = null,
    value = null,
    modelValue = null,
    labelName = 'label' as L,
    valueName = 'value' as V,
    resetLabel = 'Все',
}: ISpecsProps<S, L, V, T>): TSpecsHelper<S, T> {
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
     * 
     * @returns Логическое значение, указывающее, является ли значение спека допустимым.
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
     * @returns Значение спека полученное по valueName,
     * если значение не найдено, то вовзращает null
     */
    function getSpecValue(spec: S): T | null {
        if (typeof spec !== 'object' || spec === null) return null;

        const value = spec[valueName];

        if (value === undefined) {
            console.warn('[useSpecsHelper/getSpecValue]: failed to get spec value by valueName', spec, valueName);
            return null;
        }

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
     * - Если `spec` равен null, возвращается `resetLabel`.
     * - Если `spec` является объектом, то получаем значение по `labelName`.
     * - Если ни одно из вышеперечисленных условий не выполняется, возвращается пустая строка.
     */
    function getSpecLabel(spec: S): string {
        if (spec === null) return resetLabel;

        if (typeof spec !== 'object') return '';

        const label = spec[labelName];
        
        if (label === undefined) {
            console.warn('[useSpecsHelper/getSpecLabel]: failed to get spec label by labelName', spec, valueName);
            return '';
        }

        return label ? String(label) : '';
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
