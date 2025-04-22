// Types
import type { IPotKitJsonConfig, TDependencies } from './types';

// Node
import fs from 'fs/promises';

// Utils
import { createDir, installComponent, installComposable, installType } from './utils/installation-utils';
import { preparePrefix } from './utils/string-utils';
import { getComponentDependencies, getEmptyDependencies } from './utils/dependencies-utils';
import { getModule } from './utils/fetch-utils';

const DEFAULT_CONFIG: IPotKitJsonConfig = {
    components: "./src/components/ui/",
    styles: "./src/assets/css/ui/",
    composables: "./src/composables/",
    types: "./src/types/pot-kit/",
    imports: {
        "@": "./src"
    },
    options: {
        prefix: 'pot',
        stylesImport: true,
        potServer: false,
    }
};

/** Прочитать конфигурационный файл */ 
async function getJsonConfig(): Promise<IPotKitJsonConfig> { 
    try {
        const data = await fs.readFile('pot-kit.json', 'utf-8');
        const parsedData = JSON.parse(data) as Partial<IPotKitJsonConfig>;

        return {
            ...DEFAULT_CONFIG,
            ...parsedData,
            options: {
                ...DEFAULT_CONFIG.options,
                ...(parsedData.options ?? {}),
            }
        };
    } catch (err) {
        console.warn(`[POT-KIT]: Error! pot-kit.json loading failed!`, err);
        return { ...DEFAULT_CONFIG };
    }
}

/** Подгрузить карту зависимостей компонентов */ 
export async function getDependencies(
    componentsList: string[],
    jsonConfig: IPotKitJsonConfig
): Promise<TDependencies | null> {
    const [componentsDeps, composablesDeps] = await Promise.all([
        getModule(['dependencies', 'components.json'], jsonConfig).then((v) => JSON.parse(v)).catch(() => null),
        getModule(['dependencies', 'composables.json'], jsonConfig).then((v) => JSON.parse(v)).catch(() => null),
    ]) as Array<Record<string, TDependencies>>;

    if (!componentsDeps || !composablesDeps) {
        console.warn('[POT-KIT-COMPONENTS] unexpected error; installation failed');
        return null;
    }

    return componentsList.reduce((res, componentName) => {
        const dependencies = getComponentDependencies(componentName, res, componentsDeps, composablesDeps);

        res.components.push(...dependencies.components);
        res.composables.push(...dependencies.composables);
        res.types.push(...dependencies.types);
    
        return res;
    }, getEmptyDependencies());
}


/** Установить набор компонентов в проект пользователя */ 
async function init(componentsList: string[]) {
    console.time('[POT-KIT-COMPONENTS] installation');

    const jsonConfig: IPotKitJsonConfig = await getJsonConfig(); 

    if (!jsonConfig) return;

    const createdDirsFlags = await Promise.all([
        createDir(jsonConfig.components),
        createDir(jsonConfig.composables),
        createDir(jsonConfig.types)
    ]);

    if (createdDirsFlags.includes(false)) {
        console.warn('[POT-KIT]: Error! dirs creation failed');
        console.timeEnd('[POT-KIT-COMPONENTS] installation');
        return;
    }

    const prefixData = preparePrefix(jsonConfig.options.prefix);
    const dependencies = await getDependencies(componentsList, jsonConfig);

    if (!dependencies) {
        console.timeEnd('[POT-KIT-COMPONENTS] installation');
        return;
    }

    await Promise.all([
        ...dependencies.components.map((componentName) => installComponent(componentName, jsonConfig, prefixData)),
        ...dependencies.composables.map((composableName) => installComposable(composableName, jsonConfig)),
        ...dependencies.types.map((typeFileName) => installType(typeFileName, jsonConfig, prefixData)),
    ]);

    console.timeEnd('[POT-KIT-COMPONENTS] installation');
}

init(['button']);