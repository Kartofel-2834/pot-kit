/** Подготовка значений для css */
export function toCssValue(value: string | number): string {
    return typeof value === 'number' ? `${value}px` : value;
}

/** Получить стиль css правила */
export function getStyleRule(rule: string, value: string | number): string {
    return `${rule}: ${toCssValue(value)};`;
}

/** Сформировать css-класс */
export function getSelectorStyles(
    selectors: string[],
    rulesConfig: Record<string, string | number> = {},
): string {
    const rulesStyles = Object.entries(rulesConfig).map(([rule, varValue]) => {
        return `    ${getStyleRule(rule, varValue)}`;
    });

    return `${selectors.join(',\n')} {\n${rulesStyles.join('\n')}\n}`;
}

/** Сформировать название модификатора */
export function getModificatorClassName(name: string, value: string): string {
    return `._${[name, value].filter(Boolean).join('-')}`;
}

/** Генерация одного класса модификатора */
export function generateModificatorGroup(
    modifictorName: string,
    configuration: Record<string, string | number>,
): string {
    return Object.entries(configuration)
        .map(([name, value]) => {
            const className = getModificatorClassName(modifictorName, name);
            const styles = getSelectorStyles([className], { [`--${modifictorName}`]: value });

            return styles.trim();
        })
        .join('\n\n');
}

/** Генерация css переменных */
export function generateVars(
    name: string,
    varsRecord: Record<string, string>,
): Record<string, string> {
    if (!varsRecord || typeof varsRecord !== 'object') {
        return {};
    }

    return Object.entries(varsRecord).reduce((res, [varName, varValue]) => {
        return {
            ...res,
            [`--${name}-${varName}`]: toCssValue(varValue),
        };
    }, {});
}
