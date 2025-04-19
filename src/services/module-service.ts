// Types
import { IPotKitJsonConfig } from '../../types';

// Node
import https from 'https';
import http from 'http';

const OWN_SERVER = 'http://localhost:3000/';
const CLOUDFLARE_SERVER = 'https://pot-kit-worker.radjab-gabibov.workers.dev/';

export class ModulesService {
    /** Загрузить модуль */
    static async getModule(
        destination: string[],
        jsonConfig: IPotKitJsonConfig,
    ): Promise<string> {
        return ModulesService.fetchModule(destination, jsonConfig);
    }

    /** Загрузить модуль с удаленного сервера */
    private static async fetchModule(
        destination: string[],
        jsonConfig: IPotKitJsonConfig,
    ): Promise<string> {
        const base = jsonConfig.ownServer === true ? OWN_SERVER : CLOUDFLARE_SERVER;
        const url = new URL(`/${destination.join('/')}`, base);
        const client = /^https:\/\//.test(url.href) ? https : http;

        return new Promise(resolve => {
            client
                .get(url, res => {
                    if (!/2\d\d/.test(`${res.statusCode}`)) {
                        console.warn(
                            `[ModulesService:fetchModule] Module fetch failed with status ${res.statusCode} (${url.href})`,
                        );

                        resolve('');
                        return;
                    }

                    let data = '';

                    res.on('data', chunk => (data += chunk));
                    res.on('end', () => resolve(data));
                })
                .on('error', err => {
                    console.warn(
                        `[ModulesService:fetchModule] Module fetch failed (${url.href})`,
                        err,
                    );
                    resolve('');
                });
        });
    }
}