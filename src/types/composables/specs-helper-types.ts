// TODO: add docstrings

// Types
import type { ComputedRef } from 'vue';

export type SpecValue = string | number | boolean | null;
export type Spec = Record<string, unknown> | SpecValue;

export interface ISpecsProps {
    specs?: Spec[];
    facets?: SpecValue[] | null;
    value?: SpecValue;
    modelValue?: SpecValue;
    labelName?: string;
    valueName?: string;
}

export interface ISpecsHelperOptions extends ISpecsProps {
    trueLabel?: string;
    falseLabel?: string;
    resetLabel?: string;
}

export interface ISpecsHelper {
    currentValue: ComputedRef<SpecValue>;
    checkIsDisabled(spec: Spec): boolean;
    checkIsSelected(spec: Spec): boolean;
    checkIsValueValid(possibleValue: unknown): boolean;
    getSpecValue(spec: Spec): SpecValue;
    getSpecLabel: (spec: Spec) => string;
    getSpecClassList: (spec: Spec) => Record<string, boolean>;
    getCurrentSpec(): Spec;
}
