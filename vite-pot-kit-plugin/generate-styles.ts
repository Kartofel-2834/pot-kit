// Types
import type { IPotKitComponentConfig, IPotKitConfig } from "./types/";

// Helpers
import { StylesHelper } from "./styles-helper";
import { StringHelper } from "./string-helper";

const EDIT_WARNING = `/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */`;

const STYLES_SUBSCRIPTIONS: Record<keyof IPotKitConfig['components'], {
    radius?: boolean;
    gap?: boolean;
    columnGap?: boolean;
    rowGap?: boolean;
}> = {
    button: {
        radius: true,
    },

    checkbox: {
        radius: true,
    },

    input: {
        radius: true,
    }
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
function generateComponentStyles(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
    componentConfig: IPotKitComponentConfig,
) {
    const name = StringHelper.camelCaseToKebab(componentName);
    const componentClass = `.pot-${name}`;

    const colorStyles = generateComponentsColorsStyles(name, componentClass, config.color, componentConfig.color);
    const sizesStyles = generateComponentsSizesStyles(name, componentClass, componentConfig.size);

    const subscription = STYLES_SUBSCRIPTIONS[componentName] || {};
    const subscriptionStyles = Object.entries(subscription).map(([modificator, flag]) => {
        if (!flag) {
            return '';
        }

        return generateComponentModificatorStyles(
            name,
            componentClass,
            modificator,
            config[modificator as keyof IPotKitConfig] as Record<string, unknown>
        );
    });

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
    const selectors = Object.keys(data).map((radiusName) => {
        return componentClass + StylesHelper.getModificatorClassName(modificatorName, radiusName);
    });

    return StylesHelper.getSelectorStyles(selectors, {
        [`--${name}-radius`]: `var(--${StringHelper.camelCaseToKebab(modificatorName)})`
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


