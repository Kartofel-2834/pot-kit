export function splitCamelCase(
    str: string,
    separator: string
): string {
    return str.replace(/[A-Z0-9]+(?![a-z])|[A-Z0-9]/g, (matchedChar, index) => {
        return (index ? separator : '') + matchedChar.toLowerCase(); 
    });
}

export function camelCaseToKebab(str: string): string {
    return splitCamelCase(str, '-');
}

export function camelCaseToEnumKey(str: string): string {
    const data = str.replace(/[^a-zA-Z\-_0-9]/gm, '');
    const prefix = /[0-9]/.test(str?.[0]) ? '_' : '';

    return prefix + camelCaseToKebab(data).toUpperCase().split('-').join('_');
}

export function capitalize(str: string): string {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}