// Node
import fs from 'fs/promises';

// Types
import type { Plugin } from "vite";

// Libs
import moment from 'moment';

interface IPotKitColorThemeConfig {
    color: string,
    hover: string,
    active: string;
    text: string;
}

interface IPotKitConfig {
    colorThemes: Record<string, IPotKitColorThemeConfig>;
    breakpoints: Record<string, number>; 
}

// Local utils
/** @example capitalize('name') // 'Name' */
function capitalize(str: string): string {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

/** @example toEnumKey('some-name') // 'SOME_NAME' */
function toEnumKey(str: string): string {
    return str.toUpperCase().split('-').join('_');
}

class PotKitStylesBuildPlugin {
    static async init(config: IPotKitConfig) {
        await fs.writeFile('./src/assets/scss/config.scss', [
            `/* NOT EDIT! This file generated automatically */`,
            
            PotKitStylesBuildPlugin.getColorThemesStyles(config.colorThemes),
            PotKitStylesBuildPlugin.getBreakpointsStyles(config.breakpoints),
        ].join('\n\n'));
    }

    /** Генерация переменных для брейкпоинтов и адаптивного дизайна */
    private static getBreakpointsStyles(breakpoints: IPotKitConfig['breakpoints']): string {
        const values = PotKitStylesBuildPlugin.getStyle(breakpoints, ',');
        return `/* Breakpoints */\n$breakpoints: (\n${values}\n)`; 
    }

    /** Генерация переменных для цветовых тем компонентов */
    private static getColorThemesStyles(
        colorThemes: IPotKitConfig['colorThemes']
    ): string {
        if (!colorThemes || typeof colorThemes !== 'object') {
            return '';
        }

        const cssVars = Object.entries(colorThemes).map(([name, theme]) => {
            return PotKitStylesBuildPlugin.getStyle({
                [`--${name}`]: theme.color,
                [`--${name}-hover`]: theme.hover,
                [`--${name}-active`]: theme.active,
                [`--${name}-text`]: theme.text,
            });    
        });

        return `/* Color themes */\n:root {\n${cssVars.join('\n\n')}\n}`;
    }

    /** Генерация стилей */
    private static getStyle(
        data?: Record<string, string | number>,
        separator: string = ';'
    ): string {
        if (!data || typeof data !== 'object') {
            return '';
        }
        
        return Object.entries(data)
            .map(([key, value]) => {
                const formattedValue = typeof value === 'number' ? `${value}px` : value;
            
                return `    ${key}: ${formattedValue}${separator}`;
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
            PotKitEnumsBuildPlugin.getBreakpointsEnum(config.breakpoints)
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
        
                return `    ${fotmattedKey} = ${formattedValue}`;
            })
            .join(',\n');
        
        return `${comment}\nexport enum E${capitalize(name)} {\n${values}\n}`;
    }
}

class PotKitBuildPlugin {
    private static defaultConfig: IPotKitConfig = {
        colorThemes: {
            primary: {
                color: '#a35440',
                hover: '#964734',
                active: '#823e2e',
                text: 'var(--base-0)',
            },
        },
    
        breakpoints: {
            mobile: 0,
            // 'tablet-sm': 768,
            tablet: 1024,
            laptop: 1280,
            desktop: 1440,
        },
    };

    static async init(userConfig: Partial<IPotKitConfig>) {
        const currentConfig = PotKitBuildPlugin.prepareConfig(userConfig);

        console.info(`${moment().format('HH:MM:SS')} [POT-KIT]: enums and styles generation started`);
        
        try {
            await Promise.all([
                PotKitStylesBuildPlugin.init(currentConfig),
                PotKitEnumsBuildPlugin.init(currentConfig),
            ]);
            console.info(`${moment().format('HH:MM:SS')} [POT-KIT]: enums and styles successfully generated`);
        } catch (err) {
            console.error(`[POT-KIT]: enums and styles generation error -`, err);
        }
    }

    private static prepareConfig(userConfig: Partial<IPotKitConfig>): IPotKitConfig {
        const currentConfig: IPotKitConfig = {
            ...PotKitBuildPlugin.defaultConfig,
            ...userConfig,
        };

        // Primary тема должна гарантированно присутствовать
        currentConfig.colorThemes.primary = (
            userConfig?.colorThemes?.primary ||
            PotKitBuildPlugin.defaultConfig.colorThemes.primary
        );

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