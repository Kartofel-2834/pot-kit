// Types
import type { IGeneratedData, IPotKitConfig, IPotKitInstallationConfig, IPrefix } from '../types';

// Node
import fs from 'node:fs/promises';
import path from 'node:path';

// Libs
import { Command } from 'commander';

// Utils
import { preparePrefix } from '../utils/template-utils';
import { checkIsFileExist, createDir } from '../utils/fs-utils';

// Generate
import { generateStyles } from '../generate/styles-generate';
import { generateEnums } from '../generate/enums-generate';
import { generateComponents } from '../generate/components-generate';

// Logger
import { logger } from '../logger';
import { capitalize } from '../utils/string-utils';

interface IInitCommandOptions {
    stylesPath: string;
    componentsPath: string;
    potServer: boolean;
    server: boolean;
    overwrite: boolean;
    prefix: string;
}

export function init(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
): Command {
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

/** Проверить можно ли перезаписать файл */
async function checkOverwrite(
    filePath: string,
    installationConfig: IPotKitInstallationConfig,
): Promise<boolean> {
    if (installationConfig.options.overwrite) return true;

    const isFileExist = await checkIsFileExist(filePath);

    if (isFileExist) {
        logger.warn(
            [
                `File "${filePath}" already exists`,
                `Use --overwrite flag or change overwrite option in installation config to overwrite existing files`,
            ].join('\n'),
        );
    }

    return !isFileExist;
}

async function writeGeneratedData(
    generatedData: IGeneratedData,
    installationConfig: IPotKitInstallationConfig,
): Promise<boolean> {
    const { name, data, path: filePath, type } = generatedData;

    if (!(await checkOverwrite(filePath, installationConfig))) return false;
    if (!(await createDir(path.dirname(filePath)))) return false;

    return fs
        .writeFile(filePath, data)
        .then(() => true)
        .catch(err => {
            logger.error(`${capitalize(name)} ${type} writing error`, err);
            return false;
        });
}
