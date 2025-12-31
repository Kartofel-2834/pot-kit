// Types
import type { PathLike } from 'fs';
import type { IPotKitInstallationConfig, IPrefix } from '../types';

// Node
import fs, { constants } from 'fs/promises';
import path from 'path';

// Logger
import { logger } from '../logger';

// Utils
import { getModule } from './fetch-utils';
import { capitalize, kebabCaseToCamel } from './string-utils';
import { parseTemplate, resolveImportPath } from './template-utils';

/** Прочитать файл JSON */
export async function getJson<T>(path: PathLike): Promise<T | null> {
    return fs
        .readFile(path, 'utf-8')
        .then(data => JSON.parse(data) as T)
        .catch(() => null);
}

/** Проверить можно ли перезаписать файл */
export async function checkOverwrite(
    filePath: string,
    config: IPotKitInstallationConfig,
): Promise<boolean> {
    if (config.overwrite) return true;

    const isFileExist = await checkIsFileExist(filePath);

    if (isFileExist) {
        logger.warn(
            [
                `File "${filePath}" already exists`,
                `Use --overwrite flag or change overwrite option in installation config to overwrite existing files`,
            ].join('\n'),
        );
    }

    return !isFileExist;
}

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
    config: IPotKitInstallationConfig,
    prefixData: IPrefix,
) {
    const destination = typeFilePath.split('/');
    const fileName = destination.pop();

    const dirName = path.join(config.types, ...destination);
    const data = await getModule(['types', ...destination, `${fileName}.txt`], config);
    const outputPath = path.join(dirName, `${fileName}.ts`);

    if (!data) return false;
    if (!(await checkOverwrite(outputPath, config))) return false;
    if (!(await createDir(dirName))) return false;

    const typesImport = resolveImportPath(dirName, config.types, config.imports);
    const preparedData = parseTemplate(data, { ...prefixData, typesImport });

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
    config: IPotKitInstallationConfig,
    prefixData: IPrefix,
): Promise<boolean> {
    const data = await getModule(['composables', `${composableName}.txt`], config);
    const outputPath = path.join(config.composables, `${composableName}.ts`);

    if (!data) return false;
    if (!(await checkOverwrite(outputPath, config))) return false;
    if (!(await createDir(config.composables))) return false;

    const composablesImport = resolveImportPath(
        config.composables,
        config.composables,
        config.imports,
    );

    const typesImport = resolveImportPath(config.composables, config.types, config.imports);

    const preparedData = parseTemplate(data, { ...prefixData, typesImport, composablesImport });

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
    config: IPotKitInstallationConfig,
    prefixData: IPrefix,
): Promise<boolean> {
    const data = await getModule(['components', `${componentName}.txt`], config);
    const outputName = `${prefixData.camel}${capitalize(kebabCaseToCamel(componentName))}`;
    const outputPath = path.join(config.components, `${outputName}.vue`);

    if (!data) return false;
    if (!(await checkOverwrite(outputPath, config))) return false;
    if (!(await createDir(config.components))) return false;

    const typesImport = resolveImportPath(config.components, config.types, config.imports);

    const composablesImport = resolveImportPath(
        config.components,
        config.composables,
        config.imports,
    );

    const componentsImport = resolveImportPath(
        config.components,
        config.components,
        config.imports,
    );
    console.log('COMPONENTS IMPORT', componentsImport);
    const preparedData = parseTemplate(data, {
        ...prefixData,
        typesImport,
        composablesImport,
        componentsImport,
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
