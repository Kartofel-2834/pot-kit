// Types
import { IPotKitConfig, IPotKitInstallationConfig } from '../types';

// Constants
import { DEFAULT_CONFIG } from '../constants/config';

// Node
import path from 'node:path';

// Logger
import { logger } from '../logger';

// Utils
import { getJson } from './fs-utils';

/** Прочитать конфигурационный файл установки */
export async function getInstallationConfig(): Promise<Readonly<IPotKitInstallationConfig>> {
    const config = await getJson<IPotKitInstallationConfig>(
        path.join(process.cwd(), '.pot-kit', 'installation.json'),
    );

    if (!config) {
        logger.warn('.pot-kit/installation.json configuration file not found');
        return DEFAULT_CONFIG;
    }

    return {
        ...DEFAULT_CONFIG,
        ...config,
        options: {
            ...DEFAULT_CONFIG.options,
            ...(config?.options ?? {}),
        },
    };
}

/** Прочитать конфигурационный файл для стилей и енамов */
export async function getConfig(): Promise<IPotKitConfig | null> {
    const config = await getJson<IPotKitConfig>(
        path.join(process.cwd(), '.pot-kit', 'generation.json'),
    );

    if (!config) {
        logger.error('.pot-kit/generation.json configuration file not found');
    }

    return config;
}
