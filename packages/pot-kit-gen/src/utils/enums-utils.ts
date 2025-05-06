// Types
import type { TPrefix } from '../types';

// Utils
import { camelCaseToEnumKey, capitalize } from './string-utils';

/** Генерация кода енама на основе словаря */
export function getEnum(
    name: string,
    prefixData: TPrefix,
    data?: Record<string, string | number>,
): string {
    if (!data || typeof data !== 'object') {
        return '';
    }

    const enumConstName = `${prefixData.upper}_${camelCaseToEnumKey(name)}`;
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
    const enumType = `export type E${prefixData.camel}${enumTypeName} = typeof ${enumConstName}[keyof typeof ${enumConstName}];`;

    return `${enumConstant}\n\n${enumType}`;
}

/** Генерация енама, у которого ключи совпадают с значениями */
export function getBaseEnum(name: string, prefixData: TPrefix, data: Record<string, unknown>) {
    const enumData = Object.keys(data).reduce(
        (res, themeName) => ({
            ...res,
            [themeName]: themeName,
        }),
        {},
    );

    return getEnum(name, prefixData, enumData);
}
