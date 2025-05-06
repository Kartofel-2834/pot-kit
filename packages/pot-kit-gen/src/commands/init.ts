// Types
import type { IPotKitConfig, IPotKitInstallationConfig, TPrefix } from '../types';

// Node
import fs from 'fs/promises';
import path from 'path';

// Libs
import { Command } from 'commander';

// Utils
import { preparePrefix } from '../utils/template-utils';
import { camelCaseToKebab } from '../utils/string-utils';
import { checkIsFileExist, createDir } from '../utils/fs-utils';
import { generateGlobalStyles } from '../generate/styles-generate';
import { generateEnums } from '../generate/enums-generate';
import { generateComponents } from '../generate/components-generate';

// Logger
import { logger } from '../logger';

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
        logger.time('enums and styles generation');

        const currentConfig = appendConfig(installationConfig, options);
        const prefixData = preparePrefix(currentConfig.options.prefix);

        const [isEnumsGenerated, isStylesGenerated, componentsStylesCount] = await Promise.all([
            writeEnums(config, currentConfig, prefixData),
            writeStyles(config, currentConfig),
            writeComponentsData(config, currentConfig, prefixData),
        ]);

        if (isEnumsGenerated) {
            logger.success('Enums generated');
        }

        if (isStylesGenerated) {
            logger.success('Global styles generated');
        }

        if (componentsStylesCount) {
            logger.success(`Generated styles files for components: ${componentsStylesCount}`);
        }

        logger.timeEnd('enums and styles generation');
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

/** Установить файлы стилей компонентов в проект пользователя */
async function writeComponentsData(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: TPrefix,
): Promise<number> {
    const stylesPath = installationConfig.styles;
    const isDirCreated = await createDir(stylesPath);

    if (!isDirCreated) return 0;

    const componentsData = await generateComponents(config, installationConfig, prefixData);

    const promises = Object.entries(componentsData).map(async ([componentName, data]) => {
        const filePath = path.join(stylesPath, `${camelCaseToKebab(componentName)}.css`);

        if (!(await checkOverwrite(filePath, installationConfig))) return false;

        return fs
            .writeFile(filePath, data)
            .then(() => true)
            .catch(err => {
                logger.error(`${componentName} styles generation error`, err);
                return false;
            });
    });

    const createdComponentStyles = await Promise.all(promises).then(
        res => res.filter(flag => flag).length,
    );

    return createdComponentStyles;
}

/** Установить файлы глобальных стилей в проект пользователя */
async function writeStyles(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
): Promise<boolean> {
    const filePath = path.join(installationConfig.styles, 'index.css');

    if (!(await checkOverwrite(filePath, installationConfig))) return false;
    if (!(await createDir(installationConfig.styles))) return false;

    return fs
        .writeFile(filePath, generateGlobalStyles(config))
        .then(() => true)
        .catch(err => {
            logger.error(`global styles generation error`, err);
            return false;
        });
}

/** Установить енамы в проект пользователя */
async function writeEnums(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: TPrefix,
): Promise<boolean> {
    if (!installationConfig.types) {
        return false;
    }

    const filePath = path.join(installationConfig.types, 'index.ts');

    if (!(await checkOverwrite(filePath, installationConfig))) return false;
    if (!(await createDir(installationConfig.types))) return false;

    return fs
        .writeFile(filePath, generateEnums(config, prefixData))
        .then(() => true)
        .catch(err => {
            logger.error(`enums generation error`, err);
            return false;
        });
}
