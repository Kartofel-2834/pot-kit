// Types
import type { IPotKitJsonConfig, TPrefix } from '../types';

// Node
import fs, { constants } from 'fs/promises';
import path from 'path';

// Logger
import { logger } from '../logger';

// Utils
import { getModule } from './fetch-utils';
import { capitalize } from './string-utils';
import { parseTemplate, resolveImportPath } from './template-utils';

/** Проверить существование файла */
export async function checkIsFileExist(filePath: string): Promise<boolean> {
    return fs
        .open(filePath, 'r')
        .then(fileHandle => {
            fileHandle.close();
            return true;
        })
        .catch(() => false);
}

/** Рекурсивное создание папки, если ее нет */
export async function createDir(dirPath: string): Promise<boolean> {
    return fs
        .access(dirPath, constants.R_OK | constants.W_OK)
        .then(() => true)
        .catch(() => fs.mkdir(dirPath, { recursive: true }).then(() => true))
        .catch(err => {
            logger.error(`(createDir) Directory "${dirPath}" creation failed`, err);
            return false;
        });
}

/** Скачать файл с типами в проект пользователя */
export async function installType(
    typeFilePath: string,
    jsonConfig: IPotKitJsonConfig,
    prefixData: TPrefix,
) {
    const destination = typeFilePath.split('/');
    const fileName = destination.pop();

    const dirName = path.join(jsonConfig.types, ...destination);
    const data = await getModule(['types', ...destination, `${fileName}.txt`], jsonConfig);
    const outputPath = path.join(dirName, `${fileName}.ts`);

    if (!data) return false;
    if (!(await createDir(dirName))) return false;

    if (!jsonConfig.options.overwrite && (await checkIsFileExist(outputPath))) {
        logger.warn(
            [
                `(installComposable) Composable file "${outputPath}" already exists`,
                `Use --overwrite flag or change overwrite option in pot-kit config to overwrite existing files`,
            ].join('\n'),
        );
        return false;
    }

    const preparedData = parseTemplate(data, prefixData);

    return fs
        .writeFile(outputPath, preparedData)
        .then(() => {
            logger.success(`${typeFilePath} types file successfully installed`);
            return true;
        })
        .catch(err => {
            logger.error(`(installType) Type file "${outputPath}" install failed`, err);
            return false;
        });
}

/** Скачать файл с хуками в проект пользователя */
export async function installComposable(
    composableName: string,
    jsonConfig: IPotKitJsonConfig,
    prefixData: TPrefix,
): Promise<boolean> {
    const data = await getModule(['composables', `${composableName}.txt`], jsonConfig);
    const outputPath = path.join(jsonConfig.composables, `${composableName}.ts`);

    if (!data) return false;
    if (!(await createDir(jsonConfig.composables))) return false;

    if (!jsonConfig.options.overwrite && (await checkIsFileExist(outputPath))) {
        logger.warn(
            [
                `(installComposable) Composable file "${outputPath}" already exists`,
                `Use --overwrite flag or change overwrite option in pot-kit config to overwrite existing files`,
            ].join('\n'),
        );
        return false;
    }

    const typesImport = resolveImportPath(
        jsonConfig.composables,
        jsonConfig.types,
        jsonConfig.imports,
    );

    const preparedData = parseTemplate(data, { ...prefixData, typesImport });

    return fs
        .writeFile(outputPath, preparedData)
        .then(() => {
            logger.success(`${composableName} composable successfully installed`);
            return true;
        })
        .catch(err => {
            logger.error(`(installComposable) Composable file "${outputPath}" install failed`, err);
            return false;
        });
}

/** Скачать файл компонента в проект пользователя */
export async function installComponent(
    componentName: string,
    jsonConfig: IPotKitJsonConfig,
    prefixData: TPrefix,
): Promise<boolean> {
    const data = await getModule(['components', `${componentName}.txt`], jsonConfig);
    const outputName = `${prefixData.camel}${capitalize(componentName)}`;
    const outputPath = path.join(jsonConfig.components, `${outputName}.vue`);

    if (!data) return false;
    if (!(await createDir(jsonConfig.components))) return false;

    if (!jsonConfig.options.overwrite && (await checkIsFileExist(outputPath))) {
        logger.warn(
            [
                `(installComponent) Component file "${outputPath}" already exists`,
                `Use --overwrite flag or change overwrite option in pot-kit config to overwrite existing files`,
            ].join('\n'),
        );
        return false;
    }

    const typesImport = resolveImportPath(
        jsonConfig.components,
        jsonConfig.types,
        jsonConfig.imports,
    );

    const composablesImport = resolveImportPath(
        jsonConfig.components,
        jsonConfig.composables,
        jsonConfig.imports,
    );

    const preparedData = parseTemplate(data, {
        ...prefixData,
        typesImport,
        composablesImport,
    });

    return fs
        .writeFile(outputPath, preparedData)
        .then(() => {
            logger.success(`${componentName} component successfully installed`);
            return true;
        })
        .catch(err => {
            logger.error(`(installComponent) Component file "${outputPath}" install failed`, err);
            return false;
        });
}
