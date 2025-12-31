// Types
import { IPotKitInstallationConfig, TDependencies, TDependenciesMap, IPrefix } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';

// Constants
import { DEFAULT_CONFIG } from '../constants/config';

// Utils
import { installComponent, installComposable, installType } from '../utils/installation-utils';
import { preparePrefix } from '../utils/template-utils';
import { fetchDependenciesMap, getDependencies } from '../utils/dependencies-utils';

interface IAddCommandOptions {
    overwrite: boolean;
    prefix: string;
    potServer: boolean;
}

export function add(): Command {
    const config: IPotKitInstallationConfig = DEFAULT_CONFIG;
    const command = new Command();

    command.name('add');
    command.description('Install unstyled components to your project');
    command.argument('[components...]', 'the components to add');

    // Options
    command.option('-o, --overwrite', 'overwrite existing files');
    command.option('-p, --prefix <prefix>', 'set prefix for components');
    command.option('--pot-server', 'use own pot-server instead of cloudflare cdn');

    command.action(async (componentsList: string[], options: Partial<IAddCommandOptions>) => {
        const currentConfig = { ...config, ...options };
        const dependenciesMap = await fetchDependenciesMap(currentConfig);

        logger.time('pot-kit installation tool work duration');

        if (!dependenciesMap || !validate(componentsList, dependenciesMap)) return;

        logger.time('Dependencies collected');
        const dependencies = getDependencies(componentsList, dependenciesMap);
        const prefixData = preparePrefix(currentConfig.prefix);
        logger.timeEnd('Dependencies collected');

        await install(currentConfig, dependencies, prefixData);

        logger.timeEnd('pot-kit installation tool work duration');
    });

    return command;
}

function validate(componentsList: string[], dependenciesMap: TDependenciesMap): boolean {
    const isComponentsEmpty = !Array.isArray(componentsList) || !componentsList.length;

    if (isComponentsEmpty) {
        logger.error('Validation error: No components specified');
        return false;
    }

    const isComponentsValid = componentsList.reduce((isValid, componentName) => {
        const preparedName = componentName.toLowerCase().trim();
        const isComponentNameReserved = Boolean(dependenciesMap.components[preparedName]);

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
    config: IPotKitInstallationConfig,
    dependencies: TDependencies,
    prefixData: IPrefix,
): Promise<boolean> {
    if (!config) return false;

    const componentsPromises = dependencies.components.map(componentName =>
        installComponent(componentName, config, prefixData),
    );
    const composablesPromises = dependencies.composables.map(composableName =>
        installComposable(composableName, config, prefixData),
    );
    const typesPromises = dependencies.types.map(typeFileName =>
        installType(typeFileName, config, prefixData),
    );

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
