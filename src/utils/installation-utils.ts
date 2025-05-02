// Types
import type { IPotKitJsonConfig, TPrefix } from '../types';

// Node
import fs, { constants } from 'fs/promises';
import path from 'path';

// Utils
import { getModule } from './fetch-utils';
import { capitalize } from './string-utils';
import { parseTemplate, resolveImportPath } from './template-utils';

/** Рекурсивное создание папки, если ее нет */
export async function createDir(dirPath: string): Promise<boolean> {
    return fs
        .access(dirPath, constants.R_OK | constants.W_OK)
        .then(() => true)
        .catch(() => fs.mkdir(dirPath, { recursive: true }).then(() => true))
        .catch(() => false);
}

/** Скачать файл с типами в проект пользователя */ 
export async function installType(
    typeFilePath: string,
    jsonConfig: IPotKitJsonConfig,
    prefixData: TPrefix,
) {
    const destination = typeFilePath.split('/');
    const fileName = destination.pop();

    const data = await getModule(['types', ...destination, `${fileName}.txt`], jsonConfig);
    const preparedData = parseTemplate(data, prefixData);

    const dirName = path.join(jsonConfig.types, ...destination);
    const outputPath = path.join(dirName, `${fileName}.ts`);

    await fs.access(dirName).catch(() => createDir(dirName));

    return fs.writeFile(outputPath, preparedData).then(() => true).catch(() => false);
}

/** Скачать файл с хуками в проект пользователя */ 
export async function installComposable(
    composableName: string,
    jsonConfig: IPotKitJsonConfig,
    prefixData: TPrefix
): Promise<boolean> {
    const data = await getModule(['composables', `${composableName}.txt`], jsonConfig);
    const outputPath = path.join(jsonConfig.composables, `${composableName}.ts`);
    const typesImport = resolveImportPath(
        jsonConfig.composables,
        jsonConfig.types,
        jsonConfig.imports
    );

    const preparedData = parseTemplate(data, { ...prefixData, typesImport });

    return fs.writeFile(outputPath, preparedData).then(() => true).catch(() => false);
}

/** Скачать файл компонента в проект пользователя */
export async function installComponent(
    componentName: string,
    jsonConfig: IPotKitJsonConfig,
    prefixData: TPrefix
): Promise<boolean> {
    const data = await getModule(['components', `${componentName}.txt`], jsonConfig);
    const outputName = `${prefixData.camel}${capitalize(componentName)}`;

    if (!data) return false;
    
    const outputPath = path.join(jsonConfig.components, `${outputName}.vue`);
    
    const typesImport = resolveImportPath(
        jsonConfig.components,
        jsonConfig.types,
        jsonConfig.imports
    );

    const composablesImport = resolveImportPath(
        jsonConfig.components,
        jsonConfig.composables,
        jsonConfig.imports
    );

    const preparedData = parseTemplate(data, {
        ...prefixData,
        typesImport,
        composablesImport,
    });

    return fs.writeFile(outputPath, preparedData).then(() => true).catch(() => false);
}