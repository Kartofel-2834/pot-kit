// Types
import type { IPotKitJsonConfig } from './types';

// Node
import fs from 'fs/promises';
import path from 'path';

// Libs
import { Command } from 'commander';

// Constants
import packageJson from '../package.json';
import { DEFAULT_CONFIG } from './constants/config';

// Commands
import { add } from './commands/add';

/** Прочитать конфигурационный файл */
async function getJsonConfig(): Promise<Readonly<IPotKitJsonConfig>> {
    try {
        const data = await fs.readFile(path.join(process.cwd(), 'pot-kit.json'), 'utf-8');
        const parsedData = JSON.parse(data) as Partial<IPotKitJsonConfig>;

        return {
            ...DEFAULT_CONFIG,
            ...parsedData,
            options: {
                ...DEFAULT_CONFIG.options,
                ...(parsedData?.options ?? {}),
            },
        };
    } catch (err) {
        console.log(err);
        return DEFAULT_CONFIG;
    }
}

async function main() {
    const jsonConfig = await getJsonConfig();
    const program = new Command();

    // Info
    program.name('pot');
    program.description('Install unstyled components to your project');
    program.version(packageJson.version || '1.0.0', '-v, --version', 'output the current version');

    // Commands
    program.addCommand(add(jsonConfig));

    // Run
    program.parse();
}

main();
