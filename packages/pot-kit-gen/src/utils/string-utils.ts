/** Разбивает строку на части по правилу camelCase */
export function splitCamelCase(str: string, separator: string): string {
    return str.replace(/[A-Z0-9]+(?![a-z])|[A-Z0-9]/g, (matchedChar, index) => {
        return (index ? separator : '') + matchedChar.toLowerCase();
    });
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

/** Делает первую букву строки заглавной */
export function capitalize(str: string): string {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

/** Преобразует строку snake_case в kebab-case */
export function snakeCaseToKebab(str: string): string {
    return str.toLowerCase().replaceAll('_', '-');
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
