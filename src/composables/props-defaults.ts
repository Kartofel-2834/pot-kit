// Types
import type { TPropsDefaults } from "@/types";

export function usePropsDefaults<T extends object>(data: Partial<T>): TPropsDefaults<T> {
    return Object.entries(data).reduce((res, [key, value]) => {
        if (typeof value === 'string' && value.startsWith('__potfn__')) {
            const fn = eval(`(${value.replace(/__potfn__/gm, '')})`);
            return { ...res, [key]: fn };
        }


        return {
            ...res,
            [key]: typeof value === 'object' && value !== null ? (() => value) : value,
        };
    }, {});
}