// Helpers
import { StringHelper } from "./string-helper";

/** Хелпер для работы с енамами */
export class EnumsHelper {
    /** Генерация кода енама на основе словаря */
    static getEnum(
        name: string,
        data?: Record<string, string | number>
    ): string {
        if (!data || typeof data !== 'object') {
            return '';
        }
    
        const enumConstName = `POT_${StringHelper.camelCaseToEnumKey(name)}`;
        const enumTypeName = name.split('-').filter(Boolean).map(StringHelper.capitalize).join('');
    
        const comment = `/* ${StringHelper.capitalize(name)} */`;
        const values = Object.entries(data)
            .map(([key, value]) => {
                const fotmattedKey = StringHelper.camelCaseToEnumKey(key);
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
    static getBaseEnum(name: string, data: Record<string, unknown>) {
        const enumData = Object.keys(data).reduce((res, themeName) => ({
            ...res,
            [themeName]: themeName
        }), {});

        return EnumsHelper.getEnum(name, enumData);
    }
}