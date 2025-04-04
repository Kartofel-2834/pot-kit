// Types
import type { Plugin } from "vite";
import type { IPotKitConfig } from "../types";

// Node
import fs, { constants } from 'fs/promises';

// File data generators
import { PotKitStylesGenerator } from "./generate-styles";
import { PotKitEnumsGenerator } from './generate-enums';
import { PotKitDefaultsGenerator } from "./generate-defaults";

async function writeStyles(config: IPotKitConfig) {
    const { global, components } = await PotKitStylesGenerator.generate(config);

    try {
        await fs.access('./src/assets/css/preset', constants.R_OK | constants.W_OK);
    } catch {
        await fs.mkdir('./src/assets/css/preset');
    }

    const componentsDataWritePromises = Object.entries(components).map(([componentName, data]) => {
        return fs.writeFile(`./src/assets/css/preset/${componentName}.css`, data);
    });

    await Promise.all([
        fs.writeFile('./src/assets/css/preset/index.css', global),
        ...componentsDataWritePromises,
    ]);
}

async function writeEnums(config: IPotKitConfig) {
    return fs.writeFile(
        './src/enums/preset.ts', 
        PotKitEnumsGenerator.generate(config)
    );
}

async function writeDefaults(config: IPotKitConfig) {
    return fs.writeFile(
        './src/constants/defaults.ts',
        PotKitDefaultsGenerator.generate(config)
    );
}

async function init(config: IPotKitConfig) {
    try {
        console.time('[POT-KIT]: enums and styles generation');
        await Promise.all([
            writeEnums(config),
            writeStyles(config),
            writeDefaults(config),
        ]);
        console.timeEnd('[POT-KIT]: enums and styles generation');
    } catch (err) {
        console.warn('[POT-KIT]: enums generation error -', err);
    }
}

// Plugin exports
export * from '../types';

export function usePotConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string,
    TRadius extends string = string,
    TGap extends string = string
>(
    config: IPotKitConfig<TDevice, TColor, TSize, TRadius, TGap>
): IPotKitConfig<TDevice, TColor, TSize, TRadius, TGap> {
    return config;
}

export default function potKitBuildPlugin(config: IPotKitConfig): Plugin {
    return {
        name: 'vite-pot-kit-plugin',

        buildStart: async () => {
            await init(config);
        },
    };
}