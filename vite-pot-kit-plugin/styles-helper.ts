import { StringHelper } from "./string-helper";

export class StylesHelper {
    /** Подготовка значений для css */
    static toCssValue(value: string | number): string {
        return typeof value === 'number' ? `${value}px` : value;
    }

    /** Получить стиль css правила */
    static getStyleRule(rule: string, value: string | number): string {
        return `${StringHelper.camelCaseToKebab(rule)}: ${StylesHelper.toCssValue(value)};`;
    }

    /** Сформировать css-класс */
    static getSelectorStyles(
        selectors: string[],
        rulesConfig: Record<string, string | number> = {}
    ): string {
        const rulesStyles = Object.entries(rulesConfig).map(([rule, varValue]) => {
            return `    ${StylesHelper.getStyleRule(rule, varValue)}`;
        });
    
        return `${selectors.join(',\n')} {\n${rulesStyles.join('\n')}\n}`;
    }
    
    /** Сформировать название модификатора */
    static getModificatorClassName(name: string, value: string): string {
        return `._${[name, value].filter(Boolean).map(StringHelper.camelCaseToKebab).join('-')}`;
    }

    /** Генерация одного класса модификатора */
    static generateModificatorGroup(
        modifictorName: string,
        configuration: Record<string, string | number>
    ): string {
        return Object.entries(configuration)
            .map(([name, value]) => {
                const className = StylesHelper.getModificatorClassName(modifictorName, name);
                return StylesHelper.getSelectorStyles([className], { [`--${modifictorName}`]: value }); 
            })
            .join('\n\n');
    }
}
