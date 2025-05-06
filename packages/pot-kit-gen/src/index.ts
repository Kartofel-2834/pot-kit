// Types
import type { IPotKitConfig, IPotKitInstallationConfig } from './types';

// Node
import path from 'path';

// Libs
import { Command } from 'commander';

// Utils
import { getJson } from './utils/fs-utils';

// Constants
import packageJson from '../package.json';
import { DEFAULT_CONFIG } from './constants/config';

// Commands
import { init } from './commands/init';

// Logger
import { logger } from './logger';
import { injectStyles } from './commands/inject-styles';

/** Прочитать конфигурационный файл установки */
async function getInstallationConfig(): Promise<Readonly<IPotKitInstallationConfig>> {
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
async function getConfig(): Promise<IPotKitConfig | null> {
    const config = await getJson<IPotKitConfig>(
        path.join(process.cwd(), '.pot-kit', 'generation.json'),
    );

    if (!config) {
        logger.error('.pot-kit/generation.json configuration file not found');
    }

    return config;
}

async function main() {
    const [installationConfig, config] = await Promise.all([getInstallationConfig(), getConfig()]);

    if (!config) return;

    const program = new Command();

    // Info
    program.name('pot-gen');
    program.description('Generate style and enums for pot-kit components in your project');
    program.version(packageJson.version || '1.0.0', '-v, --version', 'output the current version');

    // Commands
    program.addCommand(init(config, installationConfig));
    program.addCommand(injectStyles(config, installationConfig));

    // Run
    program.parse();
}

main();
