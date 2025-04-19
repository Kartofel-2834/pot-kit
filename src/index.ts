// Types
import type { IPotKitJsonConfig, IPotKitJsonVerifiedConfig } from '../types';

// Node
import fs, { constants } from 'fs/promises';
import path from 'path';

// Services 
import { ModulesService } from './services/module-service';
import { DependenciesService } from './services/dependencies-service';


async function createDir(dirPath: string): Promise<boolean> {
    return fs
        .access(dirPath, constants.R_OK | constants.W_OK)
        .then(() => true)
        .catch(() => fs.mkdir(dirPath, { recursive: true }).then(() => true))
        .catch(() => false);
}

async function getJsonConfig(): Promise<IPotKitJsonConfig | null> {
    try {
        const data = await fs.readFile('pot-kit.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.warn(`[POT-KIT]: Error! pot-kit.json loading failed!`, err);
        return null;
    }
}

async function installComponent(
    componentName: string,
    jsonConfig: IPotKitJsonVerifiedConfig
): Promise<boolean> {
    const data = await ModulesService.getModule(['components', `${componentName}.txt`], jsonConfig);

    if (!data) return false;
    
    const outputPath = path.join(jsonConfig.components, `${componentName}.vue`);
    const typesRelativePath = path.relative(jsonConfig.components, jsonConfig.types).replaceAll(path.sep, '/');
    const composablesRelativePath = path.relative(jsonConfig.components, jsonConfig.composables).replaceAll(path.sep, '/');

    return fs.writeFile(
        outputPath,
        data
            .replaceAll('$types-import', typesRelativePath)
            .replaceAll('$composables-import', composablesRelativePath)
    ).then(() => true).catch(() => false);
}

async function installComposable(
    composableName: string,
    jsonConfig: IPotKitJsonVerifiedConfig
): Promise<boolean> {
    const data = await ModulesService.getModule(['composables', `${composableName}.txt`], jsonConfig);

    const outputPath = path.join(jsonConfig.composables, `${composableName}.ts`);
    const typesRelativePath = path.relative(jsonConfig.composables, jsonConfig.types).replaceAll(path.sep, '/');

    return fs.writeFile(
        outputPath,
        data.replaceAll('$types-import', typesRelativePath)
    ).then(() => true).catch(() => false);
}

async function installType(
    typeFilePath: string,
    jsonConfig: IPotKitJsonVerifiedConfig,
) {
    const destination = typeFilePath.split('/');
    const fileName = destination.pop();

    const data = await ModulesService.getModule(['types', ...destination, `${fileName}.txt`], jsonConfig);
    
    const dirName = path.join(jsonConfig.types, ...destination);
    const outputPath = path.join(dirName, `${fileName}.ts`);

    await fs.access(dirName).catch(() => createDir(dirName));

    return fs.writeFile(outputPath, data).then(() => true).catch(() => false);
}

async function init(componentsList: string[]) {
    console.time('[POT-KIT-COMPONENTS] installation');

    const jsonConfig = await getJsonConfig();

    if (!jsonConfig) return;

    const dependencies = DependenciesService.getDependencies(componentsList);
    const configUnits: Array<keyof IPotKitJsonConfig> =  ['components', 'composables', 'types']; 

    const promises = [];

    for (const unit of configUnits) {
        if (!jsonConfig[unit]) {
            console.warn(`[POT-KIT]: Error! pot-kit.json is invalid, "${unit}" field not found`);
            return;
        } else {
            promises.push(
                createDir(jsonConfig[unit] as string)
            );
        }
    }

    const createdDirsFlags = await Promise.all(promises);

    if (createdDirsFlags.includes(false)) {
        console.warn('[POT-KIT]: Error! dirs creation failed');
        return;
    }

    const verifiedJsonConfig = jsonConfig as IPotKitJsonVerifiedConfig;

    await Promise.all([
        ...dependencies.components.map((componentName) => installComponent(componentName, verifiedJsonConfig)),
        ...dependencies.composables.map((composableName) => installComposable(composableName, verifiedJsonConfig)),
        ...dependencies.types.map((typeFileName) => installType(typeFileName, verifiedJsonConfig)),
    ]);

    console.timeEnd('[POT-KIT-COMPONENTS] installation');
}

init(['PotButton']);