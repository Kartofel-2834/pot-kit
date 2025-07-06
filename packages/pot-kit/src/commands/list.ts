// Types
import { TDependenciesMap } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';

interface IListCommandOptions {
    search: string;
}

export function list(dependenciesMap: TDependenciesMap): Command {
    const command = new Command();

    command.name('list');
    command.description('List all available components');

    // Options
    command.option('-s, --search <search>', 'search component by name');

    command.action((options: Partial<IListCommandOptions>) => {
        const namesList = Object.keys(dependenciesMap.components).filter(
            name => !options.search || name.includes(options.search),
        );

        const listText = namesList.reduce((res, componentName, index) => {
            return `${res}\n${index + 1}. ${componentName}`;
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
