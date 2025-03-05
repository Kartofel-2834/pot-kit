// Types
import type { IPotKitComponentConfig, IPotKitConfig } from "./types";

// Helpers
import { camelCaseToKebab } from "./string-helper";

const EDIT_WARNING = `/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */`;

function toCssValue(value: string | number): string {
    return typeof value === 'number' ? `${value}px` : value;
}

/** Генерация одного класса модификатора */
function getClassStyles(
    name: string,
    configuration: Record<string, string | number> = {}
): string {
    const className = `.${name}`;

    const vars = Object.entries(configuration).map(([varName, varValue]) => {
        return `    ${camelCaseToKebab(varName)}: ${toCssValue(varValue)};`;
    });

    return `${className} {\n${vars.join('\n')}\n}`;
}

/** Сформировать название модификатора */
function getModificatorClassName(name: string, value: string): string {
    return `_${[name, value].filter(Boolean).map(camelCaseToKebab).join('-')}`;
}

/** Генерация группы классов модификаторов */
function generateModificatorGroup(
    modifictorName: string,
    configuration: Record<string, string | number>
): string {
    return Object.entries(configuration)
        .map(([name, value]) => {
            const className = getModificatorClassName(modifictorName, name);
            return getClassStyles(className, { [`--${modifictorName}`]: value });
        })
        .join('\n\n');
}

/** Генерация стилей цветовых тем */
function generateColors(colorsConfiguration: IPotKitConfig['color']) {
    const modificators = [];

    for (const colorName in colorsConfiguration) {
        const vars = Object.entries(colorsConfiguration[colorName]).reduce((res, [varName, varValue]) => {
            return {
                ...res,
                [`--color-${varName}`]: toCssValue(varValue)
            };
        }, {});

        modificators.push(
            getClassStyles(`_color-${camelCaseToKebab(colorName)}`, vars),
        );
    }

    return modificators.join('\n\n');
}

/** Генерация стилей размеров и расцветки компонента */
function generateComponentStyles(
    componentName: string,
    componentConfiguration: IPotKitComponentConfig,
) {
    const name = camelCaseToKebab(componentName);
    const className = `pot-${name}`;

    const colorVars = Object.entries(componentConfiguration.color).reduce((res, [varName, varValue]) => {
        return {
            ...res, 
            [`--${name}-color-${camelCaseToKebab(varName)}`]: toCssValue(varValue)
        };
    }, {});

    const colorStyles = getClassStyles(className, colorVars);

    const sizesStyles = Object.entries(componentConfiguration.size ?? []).map(([sizeName, sizeVars]) => {
        const modificatorClassName = getModificatorClassName('size', sizeName);
        
        const formattedVars = Object.entries(sizeVars ?? {}).reduce((res, [varName, varValue]) => {
            return {
                ...res,
                [`--${name}-size-${camelCaseToKebab(varName)}`]: varValue
            };
        }, {});

        return getClassStyles(`${className}.${modificatorClassName}`, formattedVars);
    });

    return [colorStyles, ...sizesStyles].join('\n\n');
}

/**
 * Генерация стилей пресета из файла конфигурации
 * для последующего создания css файлов с вшитыми в них переменными
*/
export function generateStyles(config: IPotKitConfig): {
    global: string,
    components: Record<string, string>
} {
    const globalStyles = [
        EDIT_WARNING,
        generateColors(config.color),
        generateModificatorGroup('radius', config.radius),
        generateModificatorGroup('gap', config.gap),
        generateModificatorGroup('row-gap', config.gap),
        generateModificatorGroup('column-gap', config.gap),
    ].join('\n\n');

    const componentsStyles = Object.entries(config.components)
        .reduce((res, [componentName, componentConfig]) => {
            const styles = generateComponentStyles(componentName, componentConfig);

            return {
                ...res,
                [`pot-${camelCaseToKebab(componentName)}`]: `${EDIT_WARNING}\n${styles}`
            };
        }, {});

    return {
        global: globalStyles,
        components: componentsStyles
    };
}


