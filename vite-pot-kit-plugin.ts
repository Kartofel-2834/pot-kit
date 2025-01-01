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

const defaultConfig: IPotKitConfig = {
    colorThemes: {
        primary: {
            color: '#a35440',
            hover: '#964734',
            active: '#823e2e',
            text: 'var(--base-0)',
        },

        custom: {
            color: 'red',
            hover: 'green',
            active: 'blue',
            text: 'var(--base-0)',
        }
    },

    breakpoints: {
        mobile: 0,
        'tablet-sm': 768,
        tablet: 1024,
        laptop: 1280,
        desktop: 1440,
    },
};

function getStyle(
    field: string,
    configuration?: Record<string, string | number>
): string {
    if (!configuration) {
        return '';
    }

    const comment = `/* ${field.slice(0, 1).toUpperCase()}${field.slice(1)} */`;
    const values = Object.entries(configuration)
        .map(([key, styleValue]) => {
            const value = typeof styleValue === 'number' ? `${styleValue}px` : styleValue;

            return `    ${key}: ${value}`;
        })
        .join(',\n');

    return `${comment}\n$${field}: (\n${values}\n)`;
}

function getEnum(
    field: string,
    configuration?: Record<string, string | number>
) {
    if (!configuration) {
        return '';
    }

    const capitalizedField = field.slice(0, 1).toUpperCase() + field.slice(1);
    const comment = `/* ${capitalizedField} */`;
    const values = Object.entries(configuration)
        .map(([key, value]) => {
            const fotmattedKey = key.toUpperCase().split('-').join('_');
            const formattedValue = typeof value === 'number' ? value : `'${value}'`;

            return `    ${fotmattedKey} = ${formattedValue}`;
        })
        .join(',\n');

    return `${comment}\nexport enum E${capitalizedField} {\n${values}\n}`;
}

/**
 * Генерация стилей цветовых тем
*/
function getColorThemesStyles(colorThemes: Record<string, IPotKitColorThemeConfig>): string {
    if (!colorThemes || typeof colorThemes !== 'object') {
        return '';
    }

    const getColorThemeVars = (name: string, theme: IPotKitColorThemeConfig) => {
        return [
            `    /* ${name} - theme */`,
            `    --${name}: ${theme.color};`,
            `    --${name}-hover: ${theme.hover};`,
            `    --${name}-active: ${theme.active};`,
            `    --${name}-text: ${theme.text};`,
        ].join('\n');
    };

    const cssVars = Object.entries(colorThemes).map(([name, theme]) => getColorThemeVars(name, theme));

    return `/* Color themes */\n:root{\n${cssVars.join('\n\n')}\n}`;
}

/**
 * Генерация стилей из конфига
*/
async function initStyles(config: Partial<IPotKitConfig> = {}) {
    const currentConfig: IPotKitConfig = {
        ...defaultConfig,
        ...config,
    };

    const breakpoints = Object.keys(currentConfig.breakpoints)
        .sort((a, b) => {
            return (currentConfig.breakpoints?.[a] || 0) - (currentConfig.breakpoints?.[b] || 0);
        })
        .reduce((res, name) => ({
            ...res,
            [name]: currentConfig.breakpoints[name]
        }), {});

    const configurationStyles = [
        `/* NOT EDIT! This file generated automatically */`,
        
        getColorThemesStyles(currentConfig.colorThemes),
        getStyle('breakpoints', breakpoints)
    ].join('\n\n');

    await fs.writeFile('./src/assets/scss/config.scss', configurationStyles);
}

/**
 * Генерация енамов из конфига
*/
async function initEnums(config: Partial<IPotKitConfig> = {}) {
    const currentConfig: IPotKitConfig = {
        ...defaultConfig,
        ...config,
    };

    const colorThemesEnumData = Object.keys(currentConfig.colorThemes).reduce((res, themeName) => ({
        ...res,
        [themeName]: themeName
    }), {});

    const configurationEnums = [
        `/* NOT EDIT! This file generated automatically */`,
        
        getEnum('breakpoints', currentConfig.breakpoints),
        getEnum('colorTheme', colorThemesEnumData)
    ].join('\n\n');

    await fs.writeFile('./src/enums/config.ts', configurationEnums);
}

export default function potKitBuildPlugin(config: Partial<IPotKitConfig> = {}): Plugin {
    return {
        name: 'vite-pot-kit-plugin',
        buildStart: async () => {
            console.info(`${moment().format('HH:MM:SS')} [POT-KIT]: enums and styles generation started`);
            try {
                await Promise.all([
                    initStyles(config),
                    initEnums(config)
                ]);
                console.info(`${moment().format('HH:MM:SS')} [POT-KIT]: enums and styles successfully generated`);
            } catch (err) {
                console.error(`[POT-KIT]: enums and styles generation error -`, err);
            }
        }
    };
}