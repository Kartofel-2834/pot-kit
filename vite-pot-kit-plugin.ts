// Node
import fs from 'fs/promises';

// Types
import type { Plugin } from "vite";

interface IPotKitConfig {
    breakpoints: Record<string, number>; 
}

const defaultConfig: IPotKitConfig = {
    breakpoints: {
        mobile: 0,
        'tablet-sm': 768,
        tablet: 1024,
        laptop: 1280,
        desktop: 1440,
    },
};

function parseConfigurationToStyle(
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

function parseConfigurationToEnum(
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

            return `    ${fotmattedKey} = ${value}`;
        })
        .join(',\n');

    return `${comment}\nexport enum E${capitalizedField} {\n${values}\n}`;
}

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
        
        parseConfigurationToStyle('breakpoints', breakpoints)
    ].join('\n\n');

    await fs.writeFile('./src/assets/scss/config.scss', configurationStyles);
}

async function initEnums(config: Partial<IPotKitConfig> = {}) {
    const currentConfig: IPotKitConfig = {
        ...defaultConfig,
        ...config,
    };

    const configurationEnums = [
        `/* NOT EDIT! This file generated automatically */`,
        
        parseConfigurationToEnum('breakpoints', currentConfig.breakpoints)
    ].join('\n\n');

    await fs.writeFile('./src/enums/config.ts', configurationEnums);
}

export default function potKitBuildPlugin(config: Partial<IPotKitConfig> = {}): Plugin {
    return {
        name: 'vite-pot-kit-plugin',
        buildStart: async () => {
            await Promise.all([
                initStyles(config),
                initEnums(config)
            ]);
        }
    };
}