// Types
import type {
    ISpecsHelper,
    ISpecsHelperOptions,
    Spec,
    SpecValue,
} from '@/types/composables/specs-helper-types';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from './class-list';

// TODO: add docstrings
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
}: ISpecsHelperOptions): ISpecsHelper {
    const currentValue = computed<SpecValue>(() => value || modelValue);

    // Methods
    function checkIsDisabled(spec: Spec): boolean {
        if (facets === null) return false;

        const specValue = getSpecValue(spec);

        if (specValue === null) return true;

        return !facets.includes(specValue);
    }

    function checkIsSelected(spec: Spec): boolean {
        return getSpecValue(spec) === currentValue.value && !checkIsDisabled(spec);
    }

    function checkIsValueValid(possibleValue: unknown): boolean {
        return (
            ['string', 'number', 'boolean'].includes(typeof possibleValue) || possibleValue === null
        );
    }

    function getSpecValue(spec: Spec): SpecValue {
        if (checkIsValueValid(spec)) return spec as SpecValue;

        if (typeof spec !== 'object' || spec === null) return null;

        if (!checkIsValueValid(spec[valueName])) return null;

        return spec[valueName] as SpecValue;
    }

    function getSpecLabel(spec: Spec): string {
        if (['string', 'number'].includes(typeof spec)) return `${spec}`;

        if (typeof spec === 'boolean') return spec ? trueLabel : falseLabel;

        if (spec === null) return resetLabel;

        if (typeof spec !== 'object' || !checkIsValueValid(spec[labelName])) return '';

        return getSpecLabel(spec[labelName] as SpecValue);
    }

    function getSpecClassList(spec: Spec): Record<string, boolean> {
        return useClassList({
            selected: checkIsSelected(spec),
            disabled: checkIsDisabled(spec),
        });
    }

    function getCurrentSpec(): Spec {
        return specs.find(checkIsSelected) || null;
    }

    return {
        currentValue,
        checkIsDisabled,
        checkIsSelected,
        checkIsValueValid,
        getSpecValue,
        getSpecLabel,
        getSpecClassList,
        getCurrentSpec,
    };
}
