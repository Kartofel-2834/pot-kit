// Types
import type { IPotKitConfig, IPotKitInstallationConfig } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';
import { preparePrefix } from '../utils/template-utils';

interface IInjectStylesCommandOptions {
    stylesPath: string;
    componentsPath: string;
    potServer: boolean;
    server: boolean;
    prefix: string;
}

export function injectStyles(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
): Command {
    const command = new Command();

    command.name('inject-styles');
    command.description('Inject generated styles to pot-kit components');

    // Options
    command.option('-p, --prefix <prefix>', 'set prefix for components');
    command.option('--styles-path <path>', 'set path to folder for installing styles');
    command.option('--components-path <path>', 'set path to folder for updating components');
    command.option('--pot-server', 'use own pot-server instead of cloudflare cdn');
    command.option('--server', 'use cloudflare cdn to load components');

    command.action(async (options: IInjectStylesCommandOptions) => {
        if (!config.components || typeof config.components !== 'object') {
            logger.error('Components config is not specified');
            return;
        }

        const componentsList = Object.keys(config.components);

        logger.time('styles import injection duration');

        // const currentConfig = appendConfig(installationConfig, options);
        // const prefixData = preparePrefix(currentConfig.options.prefix);

        // const successfullyInjectedStyles = await Promise.all(
        //     componentsList.map(async componentName => {
        //         const isImported = await importStylesToComponent(
        //             componentName,
        //             installationConfig,
        //             prefixData,
        //         );

        //         if (isImported) {
        //             logger.success(`${componentName} component updated`);
        //         }

        //         return isImported;
        //     }),
        // );

        // const count = successfullyInjectedStyles.filter(flag => flag).length;

        logger.log(`Updated components count: `);
        logger.timeEnd('styles import injection duration');
    });

    return command;
}

/** Дополнить конфиг инсталляции с учетом опций команды */
function appendConfig(
    config: IPotKitInstallationConfig,
    options: Partial<IInjectStylesCommandOptions>,
): IPotKitInstallationConfig {
    const usePotServer = options.server ? !options.server : options.potServer;

    return {
        ...config,
        components: options.componentsPath ?? config.components,
        styles: options.stylesPath ?? config.styles,
        options: {
            ...config.options,
            potServer: usePotServer ?? config.options.potServer,
            prefix: options.prefix || config.options.prefix,
        },
    };
}
