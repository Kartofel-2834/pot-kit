// Types
import { IPotKitInstallationConfig } from '../types';

// Node
import https from 'https';
import http from 'http';

// Libs
import { logger } from '../logger';

const OWN_SERVER = 'http://localhost:3000/';
const CLOUDFLARE_SERVER = 'https://pot-kit-worker.radjab-gabibov.workers.dev/';

/** Загрузить модуль с удаленного сервера */
export async function fetchModule(
    destination: string[],
    config: IPotKitInstallationConfig,
): Promise<string> {
    const base = config.options.potServer === true ? OWN_SERVER : CLOUDFLARE_SERVER;
    const url = new URL(`/${destination.join('/')}`, base);
    const client = /^https:\/\//.test(url.href) ? https : http;

    return new Promise(resolve => {
        client
            .get(url, res => {
                if (!/2\d\d/.test(`${res.statusCode}`)) {
                    logger.error(
                        `(fetchModule) Module fetch failed with status ${res.statusCode} (${url.href})`,
                    );
                    resolve('');
                    return;
                }

                let data = '';

                res.on('data', chunk => (data += chunk));
                res.on('end', () => resolve(data));
            })
            .on('error', err => {
                logger.error(`(fetchModule) Module fetch failed (${url.href})`, err);
                resolve('');
            });
    });
}

/** Загрузить модуль */
export async function getModule(
    destination: string[],
    config: IPotKitInstallationConfig,
): Promise<string> {
    return fetchModule(destination, config);
}
