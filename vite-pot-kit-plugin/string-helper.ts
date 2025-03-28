export class StringHelper {
    static splitCamelCase(
        str: string,
        separator: string
    ): string {
        return str.replace(/[A-Z0-9]+(?![a-z])|[A-Z0-9]/g, (matchedChar, index) => {
            return (index ? separator : '') + matchedChar.toLowerCase(); 
        });
    }

    static camelCaseToKebab(str: string): string {
        return StringHelper.splitCamelCase(str, '-');
    }

    static camelCaseToEnumKey(str: string): string {
        const data = str.replace(/[^a-zA-Z\-_0-9]/gm, '');
        const prefix = /[0-9]/.test(str?.[0]) ? '_' : '';
    
        return prefix + StringHelper.camelCaseToKebab(data).toUpperCase().split('-').join('_');
    }

    static capitalize(str: string): string {
        return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
    }
}