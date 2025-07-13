// Types
import type { IPotKitInstallationConfig } from '../types';

// Libs
import { Command } from 'commander';

// Logger
import { logger } from '../logger';
import { preparePrefix } from '../utils/template-utils';
import { getConfig, getInstallationConfig } from '../utils/config-utils';
import { injectStylesToComponent } from '../generate/components-generate';
import { writeGeneratedData } from '../utils/fs-utils';

interface IInjectStylesCommandOptions {
    stylesPath: string;
    componentsPath: string;
    potServer: boolean;
    server: boolean;
    overwrite: boolean;
    prefix: string;
}

export function injectStyles(): Command {
    const command = new Command();

    command.name('inject');
    command.description('Inject generated styles to pot-kit components');

    // Options
    command.option('-o, --overwrite', 'overwrite existing files');
    command.option('-p, --prefix <prefix>', 'set prefix for components');
    command.option('--styles-path <path>', 'set path to folder for installing styles');
    command.option('--components-path <path>', 'set path to folder for updating components');
    command.option('--pot-server', 'use own pot-server instead of cloudflare cdn');
    command.option('--server', 'use cloudflare cdn to load components');

    command.action(async (options: IInjectStylesCommandOptions) => {
        const [installationConfig, config] = await Promise.all([
            getInstallationConfig(),
            getConfig(),
        ]);

        if (!config) return;

        if (!config.components || typeof config.components !== 'object') {
            logger.error('Components config is not specified');
            return;
        }

        const componentsList = Object.keys(config.components);

        logger.time('Styles import injection duration');

        const currentConfig = appendConfig(installationConfig, options);
        const prefixData = preparePrefix(currentConfig.options.prefix);

        const injectionSuccessFlags = await Promise.all(
            componentsList.map(async componentName => {
                const generatedData = await injectStylesToComponent(
                    componentName,
                    currentConfig,
                    prefixData,
                );

                if (generatedData === null) {
                    logger.error(`Component "${componentName}" styles injection failed`);
                    return false;
                }

                return writeGeneratedData(generatedData, currentConfig);
            }),
        );

        const count = injectionSuccessFlags.filter(flag => flag).length;

        logger.log(`Updated components count: ${count}`);
        logger.timeEnd('Styles import injection duration');
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
            overwrite: options.overwrite ?? config.options.overwrite,
            potServer: usePotServer ?? config.options.potServer,
            prefix: options.prefix || config.options.prefix,
        },
    };
}
