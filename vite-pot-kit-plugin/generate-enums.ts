// Types
import type { IPotKitConfig } from "./types";

// Helpers
import { camelCaseToEnumKey, capitalize } from "./string-helper";

/** Генерация кода енама на основе словаря */
function getEnum(
    name: string,
    data?: Record<string, string | number>
): string {
    if (!data || typeof data !== 'object') {
        return '';
    }

    const enumConstName = `POT_${camelCaseToEnumKey(name)}`;
    const enumTypeName = name.split('-').filter(Boolean).map(capitalize).join('');

    const comment = `/* ${capitalize(name)} */`;
    const values = Object.entries(data)
        .map(([key, value]) => {
            const fotmattedKey = camelCaseToEnumKey(key);
            const formattedValue = typeof value === 'number' ? value : `'${value}'`;
    
            if (fotmattedKey === '' || formattedValue === '') {
                return '';
            }

            return `    ${fotmattedKey}: ${formattedValue}`;
        })
        .filter(Boolean)
        .join(',\n');
    
    const enumConstant = `${comment}\nexport const ${enumConstName} = {\n${values}\n} as const;`;
    const enumType = `export type EPot${enumTypeName} = typeof ${enumConstName}[keyof typeof ${enumConstName}];`;

    return `${enumConstant}\n\n${enumType}`;
}

/** Генерация енама, у которого ключи совпадают с значениями */
function getBaseEnum(name: string, data: Record<string, unknown>) {
    const enumData = Object.keys(data).reduce((res, themeName) => ({
        ...res,
        [themeName]: themeName
    }), {});

    return getEnum(name, enumData);
}

function getSizesEnum(sizes: IPotKitConfig['size']): string {
    const sizesEnumData = sizes.reduce((res, key) => ({
        ...res,
        [key]: key
    }), {});

    return getEnum('size', sizesEnumData);
}

function getDevicesEnum(breakpoints: IPotKitConfig['breakpoints']): string {
    const data = Object.entries(breakpoints).reduce((res, [device]) => ({
        ...res,
        [device]: device
    }), {});

    const breakpointsValues = Object.entries(breakpoints)
        .map(([key, value]) => {
            if (key === '') {
                return '';
            }

            return `    ${key}: ${value}`;
        })
        .filter(Boolean)
        .join(',\n');

    const breakpointsData = `export const POT_BREAKPOINT: { readonly [key in EPotDevice]: number; } = {\n${breakpointsValues}\n};`;

    return `${getEnum('device', data)}\n\n${breakpointsData}`;
}

export function generateEnums(config: IPotKitConfig): string {
    return [
        `/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */`,
        getBaseEnum('color', config.color),
        getBaseEnum('radius', config.radius),
        getBaseEnum('gap', config.gap),
        getDevicesEnum(config.breakpoints),
        getSizesEnum(config.size),
    ].join('\n\n');
}