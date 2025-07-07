// Types
import type { IPotKitInstallationConfig } from '../types';

// Node
import https from 'https';
import http from 'http';
import path from 'path';

// Logger
import { logger } from '../logger';

const OWN_SERVER = 'http://localhost:3000/';
const CLOUDFLARE_SERVER = 'https://pot-kit-worker.radjab-gabibov.workers.dev/';

/** Подстановка шорткатов в пути импортов в компонентах */
export function resolveImportPath(
    fromPath: string,
    toPath: string,
    importsConfig: Record<string, string>,
): string {
    const preaprePath = (v: string) => v.replaceAll(/(\/|\\)+/gm, '/').replace(/\/$/, '');

    for (const key in importsConfig) {
        if (toPath.startsWith(importsConfig[key])) {
            return preaprePath(toPath.replaceAll(importsConfig[key], key));
        }
    }

    return preaprePath(path.relative(fromPath, toPath));
}

/** Подгрузка стилевого модуля для плагина */
export async function getModule<T = unknown>(
    destination: string[],
    installationConfig: IPotKitInstallationConfig,
): Promise<T | null> {
    const data = await fetchModule(destination, installationConfig);

    if (!data) {
        return null;
    }

    try {
        return JSON.parse(data) as T;
    } catch (err) {
        logger.error('Error parsing JSON', err as Error);
        return null;
    }
}

/** Загрузить модуль с удаленного сервера */
async function fetchModule(
    destination: string[],
    installationConfig: IPotKitInstallationConfig,
): Promise<string> {
    const base = installationConfig.options.potServer === true ? OWN_SERVER : CLOUDFLARE_SERVER;
    const url = new URL(`/${destination.join('/')}`, base);
    const client = /^https:\/\//.test(url.href) ? https : http;

    return new Promise(resolve => {
        client
            .get(url, res => {
                if (!/2\d\d/.test(`${res.statusCode}`)) {
                    logger.error(`Module fetch failed with status ${res.statusCode} (${url.href})`);
                    resolve('');
                    return;
                }

                let data = '';

                res.on('data', chunk => (data += chunk));
                res.on('end', () => resolve(data));
            })
            .on('error', err => {
                logger.error(`Module fetch failed (${url.href})`, err);
                resolve('');
            });
    });
}
