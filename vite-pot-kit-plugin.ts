// Types
import type { IPotKitConfig, IPotKitColorTheme } from './pot-kit-config';

// Node
import fs from 'fs/promises';

// Types
import type { Plugin } from "vite";

// Libs
import moment from 'moment';

// DEFAULT CONFIG
import { potKitConfig as $defaultConfig } from './pot-kit-config';

// Local utils
/** @example capitalize('name') // 'Name' */
function capitalize(str: string): string {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

/** @example toEnumKey('some-name') // 'SOME_NAME' */
function toEnumKey(str: string): string {
    const data = str.replace(/[^a-zA-Z\-_0-9]/gm, '');
    const prefix = /[0-9]/.test(str?.[0]) ? '_' : '';

    return prefix + data.toUpperCase().split('-').join('_');
}

class PotKitStylesBuildPlugin {
    static async init(config: IPotKitConfig) {
        await fs.writeFile('./src/assets/scss/base/_config.scss', [
            `/* NOT EDIT! This file generated automatically */`,
            
            PotKitStylesBuildPlugin.getColorThemesStyles(config.colorThemes),
            PotKitStylesBuildPlugin.getBreakpointsStyles(config.breakpoints),
            PotKitStylesBuildPlugin.getSizesStyles(config.sizes)
        ].join('\n\n'));
    }

    /** Генерация переменных для брейкпоинтов и адаптивного дизайна */
    private static getBreakpointsStyles(breakpoints: IPotKitConfig['breakpoints']): string {
        const values = PotKitStylesBuildPlugin.getStyle(breakpoints, ',');
        return `/* Breakpoints */\n$pot-breakpoints: (\n${values}\n);`; 
    }

    /** Генерация переменных для масштабирования компонентов */
    private static getSizesStyles(sizes: IPotKitConfig['sizes']): string {
        const sizesStyleData = Object.keys(sizes).reduce((res, key) => ({
            ...res,
            [key]: String(sizes[key])
        }), {});

        const values = PotKitStylesBuildPlugin.getStyle(sizesStyleData, ',');
        return `/* Sizes */\n$pot-size-scales: (\n${values}\n);`; 
    }

    /** Генерация переменных для цветовых тем компонентов */
    private static getColorThemesStyles(
        colorThemes: IPotKitConfig['colorThemes']
    ): string {
        if (!colorThemes || typeof colorThemes !== 'object') {
            return '';
        }

        const getThemeStyle = (theme: IPotKitColorTheme): string => {
            const stateStyles = Object.entries(theme).reduce((res, [key, state]) => {
                return {
                    ...res,
                    [key]: `(\n${PotKitStylesBuildPlugin.getStyle(state, ',', 3)}\n${' '.repeat(8)})`
                };
            }, {});

            return `(\n${PotKitStylesBuildPlugin.getStyle(stateStyles, ',', 2)}\n${' '.repeat(4)})`;
        };

        const preparedThemes = Object.entries(colorThemes).reduce((res, [name, theme]) => {
            return {
                ...res,
                [name]: getThemeStyle(theme),
            };
        }, {});

        const styles = PotKitStylesBuildPlugin.getStyle(preparedThemes, ',', 1);

        return `/* Color themes */\n$pot-themes: (\n${styles}\n);`;
    }

    /** Генерация стилей */
    private static getStyle<T = Record<string, string | number>>(
        data?: T,
        separator: string = ';',
        tabs: number = 1
    ): string {
        if (!data || typeof data !== 'object') {
            return '';
        }
        
        return Object.entries(data)
            .map(([key, value]) => {
                const formattedValue = typeof value === 'number' ? `${value}px` : value;
            
                return `${' '.repeat(tabs * 4)}${key}: ${formattedValue}${separator}`;
            })
            .join(`\n`);
    }
}

class PotKitEnumsBuildPlugin {
    static async init(config: IPotKitConfig) {
        await fs.writeFile('./src/enums/config.ts', [
            `/* NOT EDIT! This file generated automatically */`,
            PotKitEnumsBuildPlugin.getColorThemesEnum(config.colorThemes),
            PotKitEnumsBuildPlugin.getDevicesEnum(config.breakpoints),
            PotKitEnumsBuildPlugin.getBreakpointsEnum(config.breakpoints),
            PotKitEnumsBuildPlugin.getSizesEnum(config.sizes),
        ].join('\n\n'));
    }

    private static getColorThemesEnum(colorThemes: IPotKitConfig['colorThemes']): string {
        const data = Object.entries(colorThemes).reduce((res, [themeName]) => ({
            ...res,
            [themeName]: themeName
        }), {});

        return PotKitEnumsBuildPlugin.getEnum('colorTheme', data);
    }

    private static getDevicesEnum(breakpoints: IPotKitConfig['breakpoints']): string {
        const data = Object.entries(breakpoints).reduce((res, [device]) => ({
            ...res,
            [device]: toEnumKey(device)
        }), {});

        return PotKitEnumsBuildPlugin.getEnum('device', data);
    }

    private static getBreakpointsEnum(breakpoints: IPotKitConfig['breakpoints']): string {
        return PotKitEnumsBuildPlugin.getEnum('breakpoint', breakpoints);
    }

    private static getSizesEnum(sizes: IPotKitConfig['sizes']): string {
        const sizesEnumData = Object.keys(sizes).reduce((res, key) => ({
            ...res,
            [key]: key
        }), {});

        return PotKitEnumsBuildPlugin.getEnum('size', sizesEnumData);
    }

    /** Генерация енама */
    private static getEnum(
        name: string,
        data?: Record<string, string | number>
    ): string {
        if (!data || typeof data !== 'object') {
            return '';
        }
        
        const comment = `/* ${capitalize(name)} */`;
        const values = Object.entries(data)
            .map(([key, value]) => {
                const fotmattedKey = toEnumKey(key);
                const formattedValue = typeof value === 'number' ? value : `'${value}'`;
        
                if (fotmattedKey === '' || formattedValue === '') {
                    return '';
                }

                return `    ${fotmattedKey} = ${formattedValue}`;
            })
            .filter(Boolean)
            .join(',\n');
        
        return `${comment}\nexport enum E${capitalize(name)} {\n${values}\n}`;
    }
}

class PotKitBuildPlugin {
    private static defaultConfig: IPotKitConfig = $defaultConfig;

    static async init(userConfig: Partial<IPotKitConfig>) {
        const getCurrentTime = () => moment().format('HH:MM:SS');

        const currentConfig = PotKitBuildPlugin.prepareConfig(userConfig);

        console.info(`${getCurrentTime()} [POT-KIT]: enums and styles generation started`);
        
        try {
            await Promise.all([
                PotKitStylesBuildPlugin.init(currentConfig),
                PotKitEnumsBuildPlugin.init(currentConfig),
            ]);
            console.info(`${getCurrentTime()} [POT-KIT]: enums and styles successfully generated`);
        } catch (err) {
            console.error(`${getCurrentTime()} [POT-KIT]: enums and styles generation error -`, err);
        }
    }

    private static prepareConfig(userConfig: Partial<IPotKitConfig>): IPotKitConfig {
        const currentConfig: IPotKitConfig = {
            ...PotKitBuildPlugin.defaultConfig,
            ...userConfig,
        };

        // Primary тема должна гарантированно присутствовать
        currentConfig.colorThemes = {
            ...PotKitBuildPlugin.defaultConfig.colorThemes,
            ...(userConfig?.colorThemes || {})
        };

        currentConfig.sizes = {
            ...PotKitBuildPlugin.defaultConfig.sizes,
            ...(userConfig?.sizes || {})
        };

        // Сортируем брейкпоинты на всякий случай, если они были указаны не в порядке возрастания
        currentConfig.breakpoints = Object.keys(currentConfig.breakpoints)
            .sort((a, b) => {
                return (currentConfig.breakpoints?.[a] || 0) - (currentConfig.breakpoints?.[b] || 0);
            })
            .reduce((res, name) => ({
                ...res,
                [name]: currentConfig.breakpoints[name]
            }), {});

        return currentConfig;
    }
}

export default function potKitBuildPlugin(userConfig: Partial<IPotKitConfig> = {}): Plugin {
    return {
        name: 'vite-pot-kit-plugin',
        buildStart: async () => {
            await PotKitBuildPlugin.init(userConfig);
        }
    };
}