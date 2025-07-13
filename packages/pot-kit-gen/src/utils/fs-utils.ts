// Types
import type { PathLike } from 'fs';
import type { IGeneratedData, IPotKitInstallationConfig } from '../types';

// Node
import fs, { constants } from 'node:fs/promises';
import path from 'node:path';

// Logger
import { logger } from '../logger';

// Utils
import { capitalize } from './string-utils';

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

/** Прочитать файл JSON */
export async function getJson<T>(path: PathLike): Promise<T | null> {
    return fs
        .readFile(path, 'utf-8')
        .then(data => JSON.parse(data) as T)
        .catch(() => null);
}

/** Проверить доступ к файлу */
export async function checkAccess(filePath: PathLike, mode?: number): Promise<boolean> {
    return fs
        .access(filePath, mode)
        .then(() => true)
        .catch(() => false);
}

export async function createDir(dirPath: PathLike): Promise<boolean> {
    return fs
        .access(dirPath, constants.R_OK | constants.W_OK)
        .then(() => true)
        .catch(() => fs.mkdir(dirPath, { recursive: true }).then(() => true))
        .catch(() => false);
}

/** Проверить можно ли перезаписать файл */
export async function checkOverwrite(
    filePath: string,
    installationConfig: IPotKitInstallationConfig,
): Promise<boolean> {
    if (installationConfig.options.overwrite) return true;

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

export async function writeGeneratedData(
    generatedData: IGeneratedData,
    installationConfig: IPotKitInstallationConfig,
): Promise<boolean> {
    const { name, data, path: filePath, type } = generatedData;

    if (!(await checkOverwrite(filePath, installationConfig))) return false;
    if (!(await createDir(path.dirname(filePath)))) return false;

    return fs
        .writeFile(filePath, data)
        .then(() => true)
        .catch(err => {
            logger.error(`${capitalize(name)} ${type} writing error`, err);
            return false;
        });
}
