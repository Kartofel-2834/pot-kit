// Types
import type { TPropsDefaults } from "@/types";

export function usePropsDefaults<T extends object>(data: Partial<T>): TPropsDefaults<T> {
    return Object.entries(data).reduce((res, [key, value]) => {
        return {
            ...res,
            [key]: typeof value === 'object' && value !== null ? (() => value) : value,
        };
    }, {});
}