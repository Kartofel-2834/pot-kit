// Types
import type { IPotKitConfig, IPotKitInstallationConfig } from '../types';
import type { IPotComponentColorConfig, IPotComponentSizeConfig } from '../types/components';

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

/** Подгрузить стили состояний для компонента */
export async function getConditionsStyles(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
): Promise<string> {
    const componentConfig = config?.['components']?.[componentName];
    const colors = componentConfig ? (componentConfig as IPotComponentColorConfig).color : null;

    const conditions = await getModule<Record<string, string>>(
        ['conditions', `${componentName}.json`],
        installationConfig,
    );

    if (!conditions) {
        return '';
    }

    const selectedConditions = Object.keys(colors || {}).map(state => {
        return conditions?.[state] || '';
    });

    return selectedConditions
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
}

/** Подгрузить конфигурационные стили для компонента */
export async function getConfigurationStyles(
    componentName: keyof IPotKitConfig['components'],
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
): Promise<string> {
    const componentConfig = config?.['components']?.[componentName];
    const sizes = componentConfig ? (componentConfig as IPotComponentSizeConfig).size : null;

    if (!config || (!config.size && !config.radius && !config.gap)) {
        return '';
    }

    const configuration = await getModule<Record<string, string>>(
        ['configuration', `${componentName}.json`],
        installationConfig,
    );

    if (!configuration) {
        return '';
    }

    return [
        config.size && sizes && configuration.size ? configuration.size : '',
        config?.radius && configuration.radius ? configuration.radius : '',
        config?.gap && configuration.gap ? configuration.gap : '',
    ]
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
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
