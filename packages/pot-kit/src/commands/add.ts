// Types
import { IPotKitInstallationConfig, TDependencies, TDependenciesMap, TPrefix } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';

// Utils
import { installComponent, installComposable, installType } from '../utils/installation-utils';
import { preparePrefix } from '../utils/template-utils';
import { getDependencies } from '../utils/dependencies-utils';

interface IAddCommandOptions {
    componentsPath: string;
    typesPath: string;
    composablesPath: string;
    overwrite: boolean;
    prefix: string;
    potServer: boolean;
    server: boolean;
}

export function add(config: IPotKitInstallationConfig, dependenciesMap: TDependenciesMap): Command {
    const command = new Command();

    command.name('add');
    command.description('Install unstyled components to your project');
    command.argument('[components...]', 'the components to add');

    // Options
    command.option('-o, --overwrite', 'overwrite existing files');
    command.option('-p, --prefix <prefix>', 'set prefix for components');
    command.option('--components-path <path>', 'set path to folder for installing components');
    command.option('--composables-path <path>', 'set path to folder for installing composables');
    command.option('--types-path <path>', 'set path to folder for installing types files');
    command.option('--pot-server', 'use own pot-server instead of cloudflare cdn');
    command.option('--server', 'use cloudflare cdn to load components');

    command.action(async (componentsList: string[], options: Partial<IAddCommandOptions>) => {
        const currentConfig = appendConfig(config, options);
        logger.time('pot-kit installation tool work duration');

        if (!validate(componentsList, dependenciesMap)) return;

        logger.time('Dependencies collected');
        const dependencies = getDependencies(componentsList, dependenciesMap);
        const prefixData = preparePrefix(currentConfig.options.prefix);
        logger.timeEnd('Dependencies collected');

        await install(currentConfig, dependencies, prefixData);

        logger.timeEnd('pot-kit installation tool work duration');
    });

    return command;
}

function appendConfig(
    config: IPotKitInstallationConfig,
    options: Partial<IAddCommandOptions>,
): IPotKitInstallationConfig {
    const usePotServer = options.server ? !options.server : options.potServer;

    return {
        ...config,
        components: options.componentsPath ?? config.components,
        composables: options.composablesPath ?? config.composables,
        types: options.typesPath ?? config.types,
        options: {
            ...config.options,
            overwrite: options.overwrite ?? config.options.overwrite,
            potServer: usePotServer ?? config.options.potServer,
            prefix: options.prefix || config.options.prefix,
        },
    };
}

function validate(componentsList: string[], dependenciesMap: TDependenciesMap): boolean {
    const isComponentsEmpty = !Array.isArray(componentsList) || !componentsList.length;

    if (isComponentsEmpty) {
        logger.error('Validation error: No components specified');
        return false;
    }

    const isComponentsValid = componentsList.reduce((isValid, componentName) => {
        const isComponentNameReserved = Boolean(dependenciesMap.components[componentName]);

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
    prefixData: TPrefix,
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
