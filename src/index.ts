// Types
import type { IPotKitJsonConfig } from '../types';

// Node
import fs, { constants } from 'fs/promises';
import path from 'path';

// Services 
import { ModulesService } from './services/module-service';
import { DependenciesService } from './services/dependencies-service';

function resolveImportPath(
    fromPath: string,
    toPath: string,
    importsConfig: Record<string, string>
): string {
    const preaprePath = (v: string) => v.replaceAll(/(\/|\\)+/gm, '/').replace(/\/$/, '');

    for (const key in importsConfig) {
        if (toPath.startsWith(importsConfig[key])) {
            return preaprePath(toPath.replaceAll(importsConfig[key], key));
        }
    }

    return preaprePath(path.relative(fromPath, toPath));
}

async function createDir(dirPath: string): Promise<boolean> {
    return fs
        .access(dirPath, constants.R_OK | constants.W_OK)
        .then(() => true)
        .catch(() => fs.mkdir(dirPath, { recursive: true }).then(() => true))
        .catch(() => false);
}

async function getJsonConfig(): Promise<Partial<IPotKitJsonConfig>> {
    try {
        const data = await fs.readFile('pot-kit.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.warn(`[POT-KIT]: Error! pot-kit.json loading failed!`, err);
        return {};
    }
}

async function installComponent(
    componentName: string,
    jsonConfig: IPotKitJsonConfig
): Promise<boolean> {
    const data = await ModulesService.getModule(['components', `${componentName}.txt`], jsonConfig);

    if (!data) return false;
    
    const outputPath = path.join(jsonConfig.components, `${componentName}.vue`);
    
    const typesImportPath = resolveImportPath(
        jsonConfig.components,
        jsonConfig.types,
        jsonConfig.imports
    );

    const composablesImportPath = resolveImportPath(
        jsonConfig.components,
        jsonConfig.composables,
        jsonConfig.imports
    );

    return fs.writeFile(
        outputPath,
        data
            .replaceAll('$types-import', typesImportPath)
            .replaceAll('$composables-import', composablesImportPath)
    ).then(() => true).catch(() => false);
}

async function installComposable(
    composableName: string,
    jsonConfig: IPotKitJsonConfig
): Promise<boolean> {
    const data = await ModulesService.getModule(['composables', `${composableName}.txt`], jsonConfig);

    const outputPath = path.join(jsonConfig.composables, `${composableName}.ts`);
    const typesImportPath = resolveImportPath(
        jsonConfig.composables,
        jsonConfig.types,
        jsonConfig.imports
    );

    return fs.writeFile(
        outputPath,
        data.replaceAll('$types-import', typesImportPath)
    ).then(() => true).catch(() => false);
}

async function installType(
    typeFilePath: string,
    jsonConfig: IPotKitJsonConfig,
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

    const jsonConfig: IPotKitJsonConfig = {
        ownServer: false,
        components: "./src/components/ui/",
        styles: "./src/assets/css/ui/",
        composables: "./src/composables/",
        types: "./src/types/pot-kit/",
        imports: {
            "@": "./src"
        },
        ...(await getJsonConfig())  
    }; 

    if (!jsonConfig) return;

    const dependencies = DependenciesService.getDependencies(componentsList);

    const createdDirsFlags = await Promise.all([
        createDir(jsonConfig.components),
        createDir(jsonConfig.composables),
        createDir(jsonConfig.types)
    ]);

    if (createdDirsFlags.includes(false)) {
        console.warn('[POT-KIT]: Error! dirs creation failed');
        return;
    }

    await Promise.all([
        ...dependencies.components.map((componentName) => installComponent(componentName, jsonConfig)),
        ...dependencies.composables.map((composableName) => installComposable(composableName, jsonConfig)),
        ...dependencies.types.map((typeFileName) => installType(typeFileName, jsonConfig)),
    ]);

    console.timeEnd('[POT-KIT-COMPONENTS] installation');
}

init(['PotButton']);