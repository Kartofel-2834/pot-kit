// Types
import type { IPotKitComponentConfig, IPotKitConfig } from "../types";

// Helpers
import { StylesHelper } from "./styles-helper";
import { StringHelper } from "./string-helper";

const EDIT_WARNING = `/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */`;

const STYLES_SUBSCRIPTIONS: Record<
    keyof IPotKitConfig['components'],
    Array<'radius' | 'gap' | 'columnGap' | 'rowGap'>
> = {
    button: ['radius'],

    checkbox: ['radius'],

    input: ['radius'],

    grid: ['gap', 'rowGap', 'columnGap'],

    group: ['gap'],
};

/** Генерация стилей цветовых тем */
function generateColors(colorsConfiguration: IPotKitConfig['color']) {
    const modificators = [];

    for (const colorName in colorsConfiguration) {
        const className = StylesHelper.getModificatorClassName('color', colorName);
        const vars = Object.entries(colorsConfiguration[colorName]).reduce((res, [varName, varValue]) => {
            return {
                ...res,
                [`--color-${varName}`]: StylesHelper.toCssValue(varValue)
            };
        }, {});

        modificators.push(
            StylesHelper.getSelectorStyles([className], vars), 
        );
    }

    return modificators.join('\n\n');
}

/** Генерация стилей размеров и расцветки компонента */
function generateComponentStyles<T extends IPotKitComponentConfig>(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
    componentConfig: T,
) {
    const name = StringHelper.camelCaseToKebab(componentName);
    const componentClass = `.pot-${name}`;

    const colorStyles = componentConfig.color ? generateComponentsColorsStyles(name, componentClass, config.color, componentConfig.color) : '';
    const sizesStyles = componentConfig.size ? generateComponentsSizesStyles(name, componentClass, componentConfig.size) : '';

    const subscription = STYLES_SUBSCRIPTIONS[componentName] || [];
    const subscribeStyles = (modificator: string, data: Record<string, unknown>) => generateComponentModificatorStyles(
        name,
        componentClass,
        modificator,
        data
    ); 

    const subscriptionStyles = [
        subscription.includes('radius') ? subscribeStyles('radius', config.radius) : '', 
        subscription.includes('gap') ? subscribeStyles('gap', config.gap) : '',  
        subscription.includes('rowGap') ? subscribeStyles('rowGap', config.gap) : '',  
        subscription.includes('columnGap') ? subscribeStyles('columnGap', config.gap) : '',  
    ];

    return [
        colorStyles,
        sizesStyles,
        ...subscriptionStyles
    ].filter(Boolean).join('\n\n');
}

function generateComponentModificatorStyles(
    name: string,
    componentClass: string,
    modificatorName: string,
    data: Record<string, unknown>,
) {
    if (!data || typeof data !== 'object') {
        return '';
    }

    const selectors = Object.keys(data).map((radiusName) => {
        return componentClass + StylesHelper.getModificatorClassName(modificatorName, radiusName);
    });

    return StylesHelper.getSelectorStyles(selectors, {
        [`--${name}-${StringHelper.camelCaseToKebab(modificatorName)}`]: `var(--${StringHelper.camelCaseToKebab(modificatorName)})`
    });
}

function generateComponentsSizesStyles(
    name: string,
    componentClass: string,
    componentSizes: IPotKitComponentConfig['size']
): string {
    if (!componentSizes) {
        return '';
    }

    return Object.entries(componentSizes)
        .map(([sizeName, sizeVars]) => {
            const modificatorClassName = StylesHelper.getModificatorClassName('size', sizeName);

            const formattedVars = Object.entries(sizeVars ?? {}).reduce((res, [varName, varValue]) => {
                return {
                    ...res,
                    [`--${name}-size-${StringHelper.camelCaseToKebab(varName)}`]: varValue
                };
            }, {});

            return StylesHelper.getSelectorStyles([componentClass + modificatorClassName], formattedVars);
        })
        .join('\n\n');
}

function generateComponentsColorsStyles(
    name: string,
    componentClass: string,
    colors: IPotKitConfig['color'],
    componentColors: IPotKitComponentConfig['color'],
): string {
    const selectors = Object.keys(colors).map((colorName) => {
        return componentClass + StylesHelper.getModificatorClassName('color', colorName);
    });

    const colorVars = Object.entries(componentColors).reduce((res, [varName, varValue]) => {
        return {
            ...res, 
            [`--${name}-color-${StringHelper.camelCaseToKebab(varName)}`]: StylesHelper.toCssValue(varValue)
        };
    }, {});

    return StylesHelper.getSelectorStyles(selectors, colorVars);
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
        StylesHelper.generateModificatorGroup('radius', config.radius),
        StylesHelper.generateModificatorGroup('gap', config.gap),
        StylesHelper.generateModificatorGroup('row-gap', config.gap),
        StylesHelper.generateModificatorGroup('column-gap', config.gap),
    ].join('\n\n');

    const componentsStyles = Object.entries(config.components)
        .reduce((res, [componentName, componentConfig]) => {
            const styles = generateComponentStyles(
                componentName as keyof IPotKitConfig['components'],
                config,
                componentConfig
            );

            return {
                ...res,
                [`pot-${StringHelper.camelCaseToKebab(componentName)}`]: `${EDIT_WARNING}\n${styles}`
            };
        }, {});

    return {
        global: globalStyles,
        components: componentsStyles
    };
}


