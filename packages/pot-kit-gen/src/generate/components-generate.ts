// Types
import { IPotKitConfig } from '../types';
import { IPotKitInstallationConfig, TPrefix } from '../types';
import {
    IPotComponentClassConfig,
    IPotComponentColorConfig,
    IPotComponentSizeConfig,
} from '../types/components';

// Node
import path from 'path';
import fs from 'fs/promises';

// Utils
import {
    getConditionsStyles,
    getConfigurationStyles,
    getModule,
    resolveImportPath,
} from '../utils/modules-utils';
import { capitalize } from '../utils/string-utils';
import {
    generateVars,
    getModificatorClassName,
    getSelectorStyles,
    toCssValue,
} from '../utils/styles-utils';
import { checkAccess } from '../utils/fs-utils';
import { parseTemplate } from '../utils/template-utils';

type TSubscriptionCharacteristic = 'radius' | 'gap' | 'columnGap' | 'rowGap';

const COMPONENT_STYLES_SUBSCRIPTIONS: Record<string, TSubscriptionCharacteristic[]> = {
    button: ['radius'],
    checkbox: ['radius'],
    input: ['radius'],
    grid: ['gap', 'rowGap', 'columnGap'],
    group: ['gap'],
    radio: ['radius'],
    tooltip: ['radius'],
};

/** Подключить сгенерированные стили в компонент */
export async function importStylesToComponent(
    componentName: string,
    installationConfig: IPotKitInstallationConfig,
    prefixData: TPrefix,
): Promise<boolean> {
    const outputName = `${prefixData.camel}${capitalize(componentName)}`;
    const componentPath = path.join(installationConfig.components, `${outputName}.vue`);

    const isComponentExist = await checkAccess(componentPath);

    if (!isComponentExist) {
        return false;
    }

    const stylesImportPath = resolveImportPath(
        installationConfig.components,
        installationConfig.styles,
        installationConfig.imports,
    );

    const data = await fs.readFile(componentPath, 'utf-8');

    const startMarker = '<!-- Styles - START -->';
    const endMarker = '<!-- Styles - END -->';

    const startIndex = data.indexOf(startMarker);
    const endIndex = data.indexOf(endMarker);

    let updatedData = data;

    if (startIndex !== -1 && endIndex !== -1) {
        updatedData = data.slice(0, startIndex) + data.slice(endIndex + endMarker.length);
    }

    updatedData = updatedData.trim();
    updatedData += `\n\n${startMarker}\n<style src="${stylesImportPath}/${componentName}.css" />\n${endMarker}`;

    return fs
        .writeFile(componentPath, updatedData)
        .then(() => true)
        .catch(() => false);
}

/** Сгенерировать стили всех компонентов из конфига */
export async function generateComponents(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: TPrefix,
): Promise<Record<string, string>> {
    const componentsStylesPromises = Object.keys(config?.components ?? {}).map(
        async componentName => {
            const styles = await generateComponentStyles(
                componentName as keyof IPotKitConfig['components'],
                config,
                installationConfig,
                prefixData,
            );
            const data = `/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */\n${styles}`;

            return { name: componentName, data };
        },
    );

    const data = await Promise.all(componentsStylesPromises);

    return data.reduce((res, { name, data }) => {
        return {
            ...res,
            [name]: data,
        };
    }, {});
}

/** Сгенерировать стили для компонента */
async function generateComponentStyles(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: TPrefix,
): Promise<string> {
    const [configurationStyles, conditionsStyles] = await Promise.all([
        getConfigurationStyles(componentName, config, installationConfig),
        getConditionsStyles(componentName, config, installationConfig),
    ]);

    const colors = generateComponentColors(componentName, config);
    const sizes = generateComponentSizes(componentName, config);
    const subscriptions = generateSubscriptionStyles(componentName, config);

    const data = [colors, sizes, subscriptions, configurationStyles, conditionsStyles]
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');

    return replaceClassNames(data, componentName, config, installationConfig, prefixData);
}

/** Подмена классов в соответствии с префиксом и конфигом */
async function replaceClassNames(
    data: string,
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: TPrefix,
): Promise<string> {
    const componentConfig = config?.['components']?.[componentName];
    const classes = componentConfig
        ? (componentConfig as IPotComponentClassConfig).className
        : null;

    const classData = await getModule<Record<string, string>>(
        ['classes', `${componentName}.json`],
        installationConfig,
    );

    let result = data;

    if (!classData) {
        return data;
    }

    for (const key in classData) {
        const className = classes?.[key];
        const prefixClass = parseTemplate(classData[key], { kebab: prefixData.kebab });

        result = result.replaceAll(classData[key], className || prefixClass);
    }

    return result;
}

/** Генерация стилей с прямой подпиской на переменные базовых классов-модификаторов */
function generateSubscriptionStyles(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
): string {
    const subscription = COMPONENT_STYLES_SUBSCRIPTIONS[componentName] || [];

    if (!subscription.length) {
        return '';
    }

    const componentClass = `.<%kebab%>-${componentName}`;

    const getStyles = (modificator: string, data?: Record<string, unknown>): string => {
        if (!data || typeof data !== 'object') {
            return '';
        }

        const selectors = Object.keys(data).map(varName => {
            return componentClass + getModificatorClassName(modificator, varName);
        });

        return getSelectorStyles(selectors, {
            [`--${componentName}-${modificator}`]: `var(--${modificator})`,
        });
    };

    return [
        subscription.includes('radius') ? getStyles('radius', config.radius) : '',
        subscription.includes('gap') ? getStyles('gap', config.gap) : '',
        subscription.includes('rowGap') ? getStyles('rowGap', config.gap) : '',
        subscription.includes('columnGap') ? getStyles('columnGap', config.gap) : '',
    ]
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
}

/** Генерация стилей размеров компонента */
function generateComponentSizes(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
): string {
    const componentConfig = config?.components?.[componentName];
    const sizesConfig = componentConfig ? (componentConfig as IPotComponentSizeConfig)?.size : null;

    if (!sizesConfig) {
        return '';
    }

    const componentClass = `.<%kebab%>-${componentName}`;

    const modificators = Object.entries(sizesConfig).map(([sizeName, sizeVars]) => {
        const className = getModificatorClassName('size', sizeName);
        const vars = generateVars(`${componentName}-size`, sizeVars as Record<string, string>);

        return getSelectorStyles([componentClass + className], vars);
    });

    return modificators
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
}

/** Генерация стилей цветовых переменных компонента */
function generateComponentColors(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
): string {
    const componentConfig = config?.components?.[componentName];
    const componentColors = componentConfig
        ? (componentConfig as IPotComponentColorConfig)?.color
        : null;

    if (!config?.color || !componentColors) {
        return '';
    }

    const componentClass = `.<%kebab%>-${componentName}`;

    const selectors = Object.keys(config.color).map(colorName => {
        return componentClass + getModificatorClassName('color', colorName);
    });

    const colorVars: Record<string, string> = {};

    for (const state in componentColors) {
        const stateData = componentColors[state];

        for (const varName in stateData) {
            const varValue = (stateData as Record<string, string>)[varName];
            const key = `--${componentName}-color-${state}-${varName}`;
            colorVars[key] = toCssValue(varValue);
        }
    }

    return getSelectorStyles(selectors, colorVars);
}
