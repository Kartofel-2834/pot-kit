// Types
import { TPrefix } from '../types';

// Node
import path from 'path';

/** Делает первую букву строки заглавной */
export function capitalize(str: string): string {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

/** Разбивает строку на части по правилу camelCase */
export function splitCamelCase(
    str: string,
    separator: string
) {
    return str.replace(/[A-Z0-9]+(?![a-z])|[A-Z0-9]/g, (matchedChar, index) => {
        return (index ? separator : '') + matchedChar.toLowerCase(); 
    });
}

/** Преобразует строку kebab-case в camelCase */
export function kebabCaseToCamel(str: string): string {
    const data = str.split('-');
    return data.shift() + data.map(capitalize).join('');
}

/** Преобразует строку kebab-case в ENUM_KEY */
export function kebabCaseToEnumKey(str: string): string {
    return str.toUpperCase().replaceAll('-', '_');
}

/** Преобразует строку snake_case в kebab-case */
export function snakeCaseToKebab(str: string): string {
    return str.toLowerCase().replaceAll('_', '-');
}

/** Преобразует строку camelCase в kebab-case */
export function camelCaseToKebab(str: string): string {
    return splitCamelCase(str, '-');
}

/** Преобразует строку camelCase в ENUM_KEY */
export function camelCaseToEnumKey(str: string): string {
    const data = str.replace(/[^a-zA-Z\-_0-9]/gm, '');
    const prefix = /[0-9]/.test(str?.[0]) ? '_' : '';

    return prefix + camelCaseToKebab(data).toUpperCase().split('-').join('_');
}

/** Подготовить префикс к вставке в компоненты */
export function preparePrefix(prefix: string): TPrefix {
    prefix = camelCaseToKebab(snakeCaseToKebab(prefix));

    return {
        kebab: prefix,
        camel: capitalize(kebabCaseToCamel(prefix)),
        upper: kebabCaseToEnumKey(prefix)
    };
}

export function replacePrefix(data: string, prefix: TPrefix): string {
    for (const key in prefix) {
        data = data.replaceAll(`%${key}%`, prefix[key as keyof TPrefix]);
    }

    return data;
}

/** Подстановка шорткатов в пути импортов в компонентах */
export function resolveImportPath(
    fromPath: string,
    toPath: string,
    importsConfig: Record<string, string>
): string {
    const preaprePath = (v: string) => v.replaceAll(/(\/|\\)+/gm, '/').replace(/\/$/, '');

    for (const key in importsConfig) {
        if (toPath.startsWith(importsConfig[key])) {
            return preaprePath(toPath.replaceAll(importsConfig[key], key));
        }
    }

    return preaprePath(path.relative(fromPath, toPath));
}