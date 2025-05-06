#!/usr/bin/env node
// Types
import type { IPotKitInstallationConfig } from './types';

// Node
import path from 'path';

// Libs
import { Command } from 'commander';

// Constants
import packageJson from '../package.json';
import { DEFAULT_CONFIG } from './constants/config';

// Commands
import { add } from './commands/add';
import { list } from './commands/list';

// Utils
import { getJson } from './utils/installation-utils';

// Logger
import { logger } from './logger';

/** Прочитать конфигурационный файл */
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

async function main() {
    const config = await getInstallationConfig();
    const program = new Command();

    // Info
    program.name('pot');
    program.description('Install unstyled components to your project');
    program.version(packageJson.version || '1.0.0', '-v, --version', 'output the current version');

    // Commands
    program.addCommand(add(config));
    program.addCommand(list());

    // Run
    program.parse();
}

main();
