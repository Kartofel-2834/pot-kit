// Types
import { IPotKitInstallationConfig } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';

// Constants
import { DEFAULT_CONFIG } from '../constants/config';

// Utils
import { fetchDependenciesMap } from '../utils/dependencies-utils';
import { capitalize } from '../utils/string-utils';

interface IListCommandOptions {
    search: string;
    potServer: boolean;
}

export function list(): Command {
    const command = new Command();

    command.name('list');
    command.description('List all available components');

    // Options
    command.option('-s, --search <search>', 'search component by name');
    command.option('--pot-server', 'use own pot-server instead of cloudflare cdn');

    command.action(async (options: Partial<IListCommandOptions>) => {
        const currentConfig: IPotKitInstallationConfig = {
            ...DEFAULT_CONFIG,
            potServer: options.potServer ?? DEFAULT_CONFIG.potServer,
        };

        const dependenciesMap = await fetchDependenciesMap(currentConfig);

        if (!dependenciesMap) return;

        const namesList = Object.keys(dependenciesMap.components).filter(
            name => !options.search || name.includes(options.search),
        );

        const listText = namesList.reduce((res, componentName, index) => {
            const currentNumber = index + 1;
            const spacesCount = `${namesList.length}`.length - `${currentNumber}`.length;

            return `${res}\n${currentNumber}.${' '.repeat(spacesCount)} ${capitalize(componentName)}`;
        }, '');

        if (listText.length > 0) {
            logger.log(
                `Available components:${listText}\n\nFor add component to project use "add" command`,
            );
        } else {
            logger.warn('No components available');
        }
    });

    return command;
}
