// Node
import fs from 'fs/promises';
import path from 'path';

// Types
import type { IPotComponentColorConfig, IPotComponentSizeConfig, IPotKitConfig } from "../types";

// Helpers
import { StylesHelper } from "../helpers/styles-helper";
import { StringHelper } from "../helpers/string-helper";

const STYLES_SUBSCRIPTIONS: Record<
    keyof IPotKitConfig['components'],
    Array<'radius' | 'gap' | 'columnGap' | 'rowGap'>
> = {
    button: ['radius'],
    checkbox: ['radius'],
    // input: ['radius'],
    grid: ['gap', 'rowGap', 'columnGap'],
    group: ['gap'],
    icon: [],
    link: [],
    radio: ['radius'],
};

class PotKitColorsGenerator {
    /** Генерация стилей цветовых тем */
    static generate(colorsConfiguration: IPotKitConfig['color']): string {
        if (!colorsConfiguration) {
            return '';
        }

        const modificators = Object.entries(colorsConfiguration).map(([colorName, config]) => {
            const className = StylesHelper.getModificatorClassName('color', colorName);
            const vars = PotKitColorsGenerator.generateVars(config);

            return StylesHelper.getSelectorStyles([className], vars);
        });

        return modificators.filter(Boolean).join('\n\n');
    }

    /** Генерация css переменных для цветовых тем */
    private static generateVars(varsRecord: Record<string, string>): Record<string, string> {
        return Object.entries(varsRecord).reduce((res, [varName, varValue]) => {
            return {
                ...res,
                [`--color-${StringHelper.camelCaseToKebab(varName)}`]: StylesHelper.toCssValue(varValue)
            };
        }, {});
    }
}

class PotKitComponentsStylesGenerator {
    /** Генерация стилей размеров и расцветки компонента */
    static async generate(
        componentName: keyof IPotKitConfig['components'],
        config: IPotKitConfig,
    ): Promise<string> {
        const styles = await PotKitComponentsStylesGenerator.getConfigurationStyles(componentName, config);

        const colors = PotKitComponentsStylesGenerator.generateColors(componentName, config);
        const sizes = PotKitComponentsStylesGenerator.generateSizes(componentName, config);
        const subscriptions = PotKitComponentsStylesGenerator.generateSubscriptionStyles(componentName, config);

        return [
            colors,
            sizes,
            subscriptions,
            styles,
        ].filter(Boolean).join('\n\n');
    }

    // TODO: Вынести в отдельный скрипт подготовки стилей в словарь и исключить из скрипта генерации
    private static async getConfigurationStyles(
        componentName: keyof IPotKitConfig['components'],
        config: IPotKitConfig
    ): Promise<string> {
        const kebabName = StringHelper.camelCaseToKebab(componentName);
        const handleError = (err: unknown): string => {
            console.warn('[POT-KIT/PotKitComponentsStylesGenerator.getConfigurationStyles]:', err);
            return '';
        };

        const colors = (config['components'][componentName] as IPotComponentColorConfig)?.color;

        const stylesDir = path.join(__dirname, '..', 'styles');
        const fileName = `pot-${kebabName}.css`;

        const [
            base,
            configuration,
            conditions
        ] = await Promise.all([
            fs.readFile(path.join(stylesDir, 'base', fileName), 'utf8').then((v) => v.trim()).catch(handleError),
            fs.readFile(path.join(stylesDir, 'configuration', fileName), 'utf8').then((v) => v.trim()).catch(handleError),
            !colors ? '' : fs.readFile(path.join(stylesDir, 'conditions', fileName), 'utf8').catch(handleError),
        ]);

        if (!colors) return [base, configuration].filter(Boolean).join('\n\n');

        const selectedConditions = [];

        for (const state in colors) {
            const stateStartMarker = `/* CONDITION:${state} - START */`;
            const stateEndMarker = `/* CONDITION:${state} - END */`;

            const startIndex = conditions.indexOf(stateStartMarker);
            const endIndex = conditions.indexOf(stateEndMarker);
        
            if (startIndex === -1 || endIndex === -1) {
                continue;
            }

            const data = conditions.slice(startIndex + stateStartMarker.length, endIndex);

            selectedConditions.push(data.trim());
        }

        return [
            base,
            configuration,
            ...selectedConditions
        ].filter(Boolean).join('\n\n');
    } 

    /** Генерация стилей с прямой подпиской на переменные базовых классов-модификаторов */ 
    private static generateSubscriptionStyles(
        componentName: keyof IPotKitConfig['components'],
        config: IPotKitConfig
    ): string {
        const subscription = STYLES_SUBSCRIPTIONS[componentName] || [];

        if (!subscription.length) {
            return '';
        }

        const kebabName = StringHelper.camelCaseToKebab(componentName);
        const componentClass = `.pot-${kebabName}`;
        
        const getStyles = (modificator: string, data?: Record<string, unknown>): string => {
            if (!data || typeof data !== 'object') {
                return '';
            }

            const selectors = Object.keys(data).map((varName) => {
                return componentClass + StylesHelper.getModificatorClassName(modificator, varName);
            });

            return StylesHelper.getSelectorStyles(selectors, {
                [`--${kebabName}-${StringHelper.camelCaseToKebab(modificator)}`]: `var(--${StringHelper.camelCaseToKebab(modificator)})`
            });
        };

        return [
            subscription.includes('radius') ? getStyles('radius', config.radius) : '', 
            subscription.includes('gap') ? getStyles('gap', config.gap) : '',  
            subscription.includes('rowGap') ? getStyles('rowGap', config.gap) : '',  
            subscription.includes('columnGap') ? getStyles('columnGap', config.gap) : '',  
        ].filter(Boolean).join('\n\n');
    }

    /** Генерация стилей размеров компонента */
    private static generateSizes(
        componentName: keyof IPotKitConfig['components'],
        config: IPotKitConfig,
    ): string {
        const componentConfig = config.components[componentName] as IPotComponentSizeConfig;    
        const sizesConfig = componentConfig?.size;

        if (!sizesConfig) {
            return '';
        }

        const kebabName = StringHelper.camelCaseToKebab(componentName);
        const componentClass = `.pot-${kebabName}`;

        const modificators = Object.entries(sizesConfig).map(([sizeName, sizeVars]) => {
            const className = StylesHelper.getModificatorClassName('size', sizeName);
            const vars = PotKitComponentsStylesGenerator.generateVars(`${kebabName}-size`, sizeVars as Record<string, string>);

            return StylesHelper.getSelectorStyles([componentClass + className], vars);
        });
            
        return modificators.filter(Boolean).join('\n\n');
    }

    /** Генерация стилей цветовых переменных компонента */ 
    private static generateColors(
        componentName: keyof IPotKitConfig['components'],
        config: IPotKitConfig,
    ): string {
        const componentColors = (config.components[componentName] as IPotComponentColorConfig)?.color;

        if (!config?.color || !componentColors) {
            return '';
        }

        const kebabName = StringHelper.camelCaseToKebab(componentName);
        const componentClass = `.pot-${kebabName}`;

        const selectors = Object.keys(config.color).map((colorName) => {
            return componentClass + StylesHelper.getModificatorClassName('color', colorName);
        });
    
        const colorVars: Record<string, string> = {};

        for (const state in componentColors) {
            const stateData = componentColors[state];

            for (const varName in stateData) {
                const varValue = (stateData as Record<string, string>)[varName];
                colorVars[`--${kebabName}-color-${StringHelper.camelCaseToKebab(state)}-${StringHelper.camelCaseToKebab(varName)}`] = StylesHelper.toCssValue(varValue);
            }
        }
    
        return StylesHelper.getSelectorStyles(selectors, colorVars);
    }

    /** Генерация css переменных */
    private static generateVars(name: string, varsRecord: Record<string, string>): Record<string, string> {
        if (!varsRecord || typeof varsRecord !== 'object') {
            return {};
        }

        return Object.entries(varsRecord).reduce((res, [varName, varValue]) => {
            return {
                ...res,
                [`--${name}-${StringHelper.camelCaseToKebab(varName)}`]: varValue
            };
        }, {});
    }
}

export class PotKitStylesGenerator {
    private static EDIT_WARNING = `/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */`;

    /** Генерация css стилей */
    static async generate(config: IPotKitConfig): Promise<{
        global: string,
        components: Record<string, string>
    }> {
        return {
            global: PotKitStylesGenerator.generateGlobalStyles(config),
            components: await PotKitStylesGenerator.generateComponentsStyles(config)
        };
    }

    /** Генерация css стилей общих для всех компонентов */
    private static generateGlobalStyles(config: IPotKitConfig): string {
        return [
            PotKitStylesGenerator.EDIT_WARNING,
            PotKitColorsGenerator.generate(config.color),
            StylesHelper.generateModificatorGroup('radius', config.radius ?? {}),
            StylesHelper.generateModificatorGroup('gap', config.gap ?? {}),
            StylesHelper.generateModificatorGroup('row-gap', config.gap ?? {}),
            StylesHelper.generateModificatorGroup('column-gap', config.gap ?? {}),
        ].filter(Boolean).join('\n\n');
    }

    /** Генерация css стилей компонентов */
    private static async generateComponentsStyles(config: IPotKitConfig): Promise<Record<string, string>> {
        const componentsStyles = await Promise.all(
            Object.keys(config.components).map(async (componentName) => {
                const name = `pot-${StringHelper.camelCaseToKebab(componentName)}`;
                const styles = await PotKitComponentsStylesGenerator.generate(componentName as keyof IPotKitConfig['components'], config);
                const data = `${PotKitStylesGenerator.EDIT_WARNING}\n${styles}`;

                return { name, data };
            })
        );

        return componentsStyles.reduce((res, { name, data }) => {
            return {
                ...res,
                [name]: data
            };
        }, {});
    }
} 