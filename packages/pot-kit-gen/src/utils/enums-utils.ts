// Types
import type { IPrefix } from '../types';

// Utils
import { camelCaseToEnumKey, capitalize } from './string-utils';

/** Получить имя константы енама */
export function getEnumConstName(name: string, prefixData: IPrefix): string {
    return `${prefixData.upper}_${camelCaseToEnumKey(name)}`;
}

/** Получить имя типа енама */
export function getEnumTypeName(name: string, prefixData: IPrefix): string {
    return ['E', prefixData.camel, ...name.split('-')].filter(Boolean).map(capitalize).join('');
}

export function patchEnumConst(content: string, data: string, name: string, prefixData: IPrefix) {
    const enumConstName = getEnumConstName(name, prefixData);
    const enumConstRegex = new RegExp(
        `export const ${enumConstName} = ((.|\n)+?)? as const;`,
        'gm',
    );

    return enumConstRegex.test(content)
        ? content.replace(enumConstRegex, data)
        : content.trim() + '\n\n' + data;
}

export function patchEnumType(content: string, data: string, name: string, prefixData: IPrefix) {
    const enumTypeName = getEnumTypeName(name, prefixData);
    const enumConstName = getEnumConstName(name, prefixData);
    const enumTypeRegex = new RegExp(
        `export type ${enumTypeName}( |\n)+=( |\n)+\\(?typeof ${enumConstName}\\)?\\[keyof typeof ${enumConstName}\\];`,
        'gm',
    );

    return enumTypeRegex.test(content)
        ? content.replace(enumTypeRegex, data)
        : content.trim() + '\n\n' + data;
}

/** Генерация кода енама на основе словаря */
export function getEnum(
    name: string,
    prefixData: IPrefix,
    data?: Record<string, string | number>,
): string[] {
    if (!data || typeof data !== 'object') {
        return [];
    }

    const enumConstName = getEnumConstName(name, prefixData);
    const enumTypeName = getEnumTypeName(name, prefixData);

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

    const enumConstant = `export const ${enumConstName} = {\n${values}\n} as const;`;
    const enumType = `export type ${enumTypeName} = (typeof ${enumConstName})[keyof typeof ${enumConstName}];`;

    return [enumConstant, enumType];
}

/** Генерация енама, у которого ключи совпадают с значениями */
export function getBaseEnum(
    name: string,
    prefixData: IPrefix,
    data: Record<string, unknown>,
): string {
    const enumData = Object.keys(data).reduce(
        (res, themeName) => ({
            ...res,
            [themeName]: themeName,
        }),
        {},
    );

    return getEnum(name, prefixData, enumData).join('\n\n');
}
