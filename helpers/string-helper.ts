/** Хелпер для работы с строками */
export class StringHelper {
    /** Разбивает строку на части по правилу camelCase */
    static splitCamelCase(
        str: string,
        separator: string
    ): string {
        return str.replace(/[A-Z0-9]+(?![a-z])|[A-Z0-9]/g, (matchedChar, index) => {
            return (index ? separator : '') + matchedChar.toLowerCase(); 
        });
    }

    /** Преобразует строку camelCase в kebab-case */
    static camelCaseToKebab(str: string): string {
        return StringHelper.splitCamelCase(str, '-');
    }

    /** Преобразует строку camelCase в ENUM_KEY */
    static camelCaseToEnumKey(str: string): string {
        const data = str.replace(/[^a-zA-Z\-_0-9]/gm, '');
        const prefix = /[0-9]/.test(str?.[0]) ? '_' : '';
    
        return prefix + StringHelper.camelCaseToKebab(data).toUpperCase().split('-').join('_');
    }

    /** Делает первую букву строки заглавной */
    static capitalize(str: string): string {
        return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
    }
}