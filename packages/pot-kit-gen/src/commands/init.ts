// Types
import type { IPotKitInstallationConfig } from '../types';

// Libs
import { Command } from 'commander';

// Utils
import { preparePrefix } from '../utils/template-utils';
import { writeGeneratedData } from '../utils/fs-utils';

// Generate
import { generateStyles } from '../generate/styles-generate';
import { generateEnums } from '../generate/enums-generate';
import { generateComponents } from '../generate/components-generate';

// Logger
import { logger } from '../logger';
import { getConfig, getInstallationConfig } from '../utils/config-utils';

interface IInitCommandOptions {
    stylesPath: string;
    componentsPath: string;
    potServer: boolean;
    server: boolean;
    overwrite: boolean;
    prefix: string;
}

export function init(): Command {
    const command = new Command();

    command.name('init');
    command.description('Generate style and enums for pot-kit components in your project');

    // Options
    command.option('-o, --overwrite', 'overwrite existing files');
    command.option('-p, --prefix <prefix>', 'set prefix for components');
    command.option('--styles-path <path>', 'set path to folder for installing styles');
    command.option('--components-path <path>', 'set path to folder for updating components');
    command.option('--pot-server', 'use own pot-server instead of cloudflare cdn');
    command.option('--server', 'use cloudflare cdn to load components');

    command.action(async (options: Partial<IInitCommandOptions>) => {
        const [installationConfig, config] = await Promise.all([
            getInstallationConfig(),
            getConfig(),
        ]);

        if (!config) return;

        logger.time('pot-kit-gen work time');

        const currentConfig = appendConfig(installationConfig, options);
        const prefixData = preparePrefix(currentConfig.options.prefix);

        const stylesData = generateStyles(config, currentConfig);
        const enumsData = generateEnums(config, currentConfig, prefixData);
        const componentsData = await generateComponents(config, currentConfig, prefixData);

        const stylesPromise = stylesData ? writeGeneratedData(stylesData, currentConfig) : false;
        const enumsPromise = enumsData ? writeGeneratedData(enumsData, currentConfig) : false;
        const componentsPromise = Promise.all(
            componentsData.map(v => writeGeneratedData(v, currentConfig)),
        ).then(res => res.includes(true));

        const [isStylesGenerated, isEnumsGenerated, isComponentsDataGenerated] = await Promise.all([
            stylesPromise,
            enumsPromise,
            componentsPromise,
        ]);

        if (isEnumsGenerated) logger.success('Enums generated');
        if (isStylesGenerated) logger.success('Global styles generated');
        if (isComponentsDataGenerated) logger.success(`Components styles and enums generated`);

        logger.timeEnd('pot-kit-gen work time');
    });

    return command;
}

/** Дополнить конфиг инсталляции с учетом опций команды */
function appendConfig(
    config: IPotKitInstallationConfig,
    options: Partial<IInitCommandOptions>,
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
