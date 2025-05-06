// Types
import { PathLike } from 'fs';

// Node
import fs, { constants } from 'fs/promises';

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
