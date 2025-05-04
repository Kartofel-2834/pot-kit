// Types
import { IPotKitJsonConfig, TDependencies, TPrefix } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';

// Utils
import { installComponent, installComposable, installType } from '../utils/installation-utils';
import { preparePrefix } from '../utils/template-utils';
import { getDependencies } from '../utils/dependencies-utils';

// Constants
import { DEPENDENCIES } from '../constants/dependencies';

export function add(jsonConfig: IPotKitJsonConfig): Command {
    const command = new Command();

    command.name('add');
    command.description('Install unstyled components to your project');
    command.argument('[components...]', 'the components to add');
    command.option('-o, --overwrite', 'overwrite existing files', false);

    command.action(async (componentsList) => {
        logger.time('pot-kit installation tool work duration');

        if (!validate(componentsList)) return;

        logger.time('Dependencies collected');
        const dependencies = getDependencies(componentsList);
        const prefixData = preparePrefix(jsonConfig.options.prefix);
        logger.timeEnd('Dependencies collected');

        await install(jsonConfig, dependencies, prefixData);

        logger.timeEnd('pot-kit installation tool work duration');
    });

    return command;
}

function validate(
    componentsList: string[],
): boolean {
    const isComponentsEmpty = !Array.isArray(componentsList) || !componentsList.length;

    if (isComponentsEmpty) {
        logger.error('Validation error: No components specified');
        return false;
    }

    const isComponentsValid = componentsList.reduce((isValid, componentName) => {
        const isComponentNameReserved = Boolean(DEPENDENCIES.components[componentName]);
    
        if (!isComponentNameReserved) {
            logger.error(`Validation error: Component "${componentName}" is not supported`);
        }

        return isValid && isComponentNameReserved;
    }, true);

    if (!isComponentsValid) {
        return false;
    }

    return true;
}

async function install(
    jsonConfig: IPotKitJsonConfig,
    dependencies: TDependencies,
    prefixData: TPrefix,
): Promise<boolean> {
    if (!jsonConfig) return false;

    const componentsPromises = dependencies.components.map((componentName) => installComponent(componentName, jsonConfig, prefixData));
    const composablesPromises = dependencies.composables.map((composableName) => installComposable(composableName, jsonConfig, prefixData));
    const typesPromises = dependencies.types.map((typeFileName) => installType(typeFileName, jsonConfig, prefixData));

    logger.time('Installation duration');
    const [componentsFlags, composablesFlags, typesFlags] = await Promise.all([
        Promise.all(componentsPromises),
        Promise.all(composablesPromises),    
        Promise.all(typesPromises),
    ]);
    logger.timeEnd('Installation duration');

    const componentsCount = componentsFlags.filter(Boolean).length;
    const composablesCount = composablesFlags.filter(Boolean).length;
    const typesCount = typesFlags.filter(Boolean).length;

    logger.info(`Installed ${componentsCount} components`);
    logger.info(`Installed ${composablesCount} composables`);
    logger.info(`Installed ${typesCount} type files`);

    return Boolean(componentsCount || composablesCount || typesCount);
}
