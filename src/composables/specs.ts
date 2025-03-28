// Types
import type {
    TSpecs,
    TSpecValue,
    TModifiedSpec,
    ISpecsProps,
} from '@/types/composables';

// Vue
import { computed } from 'vue';

// TODO: оптимизировать это решение

/**
 * Компосабл возвращающий набор методов для упрощения реализации фасетного поиска.
 */
export function useSpecs<
    S extends object | TSpecValue,
    L extends (S extends object ? keyof S : string),
    V extends (S extends object ? keyof S : string),
    T extends (V extends keyof S ? S[V] : S) 
>({
    specs = [],
    facets = null,
    value = null,
    modelValue = null,
    labelName,
    valueName,
    resetLabel = 'Все',
    trueLabel = 'Да',
    falseLabel = 'Нет',
}: ISpecsProps<S, L, V, T>): TSpecs<S, V, T> {
    const currentValue = computed(() => (value ?? modelValue) as T | T[] | null);

    function checkIsDisabled(spec: S): boolean {
        if (facets === null) return false;

        const specValue = getSpecValue(spec);

        if (specValue === null) return true;

        return !(facets as T[]).includes(specValue);
    }

    function checkIsSelected(spec: S): boolean {
        if (checkIsDisabled(spec)) return false;

        const value = getSpecValue(spec);

        if (!Array.isArray(currentValue.value)) return value === currentValue.value;

        return value !== null && currentValue.value.includes(value);
    }

    function checkIsValueValid(possibleValue: unknown): boolean {
        return (
            ['string', 'number', 'bigint', 'boolean'].includes(typeof possibleValue) ||
            possibleValue === null
        );
    }

    function getSpecValue(spec: S): T | null {
        if (spec === null || spec === undefined) {
            return null;
        }

        if (checkIsValueValid(spec)) {
            return spec as T;
        }

        if (typeof spec !== 'object') {
            console.warn('[useSpecsHelper/getSpecValue]: invalid spec type', spec);
            return null;
        }

        const value = (spec as S)?.[valueName as keyof S];

        if (value === undefined) {
            console.warn('[useSpecsHelper/getSpecValue]: failed to get spec value by valueName', spec, valueName);
            return null;
        }

        if (!checkIsValueValid(value)) return null;

        return value as T;
    }

    function getSpecLabel(spec: S): string {
        if (spec === null || spec === undefined) {
            return resetLabel;
        }

        if (
            typeof spec === 'number' ||
            typeof spec === 'bigint' ||
            typeof spec === 'string'
        ) {
            return String(spec);
        }

        if (typeof spec === 'boolean') {
            return spec ? trueLabel : falseLabel;
        }

        const label = (spec as S)?.[labelName as keyof S];
        
        if (label === undefined) {
            console.warn('[useSpecsHelper/getSpecLabel]: failed to get spec label by labelName', spec, valueName);
            return '';
        }

        return label ? String(label) : '';
    }

    function getCurrentSpec(): S | null {
        return (specs as S[]).find(checkIsSelected) || null;
    }

    function getModifiedSpecs(specsArg: S[] = specs as S[]): TModifiedSpec<S, V, T>[] {
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
