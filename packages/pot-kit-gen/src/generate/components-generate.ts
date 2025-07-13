// Types
import {
    IGeneratedData,
    IPotKitConfig,
    IPotKitInstallationConfig,
    IPrefix,
    TCharacteristics,
} from '../types';

// Node
import path from 'node:path';
import fs from 'node:fs/promises';

// Utils
import { getEnum, patchEnumConst, patchEnumType } from '../utils/enums-utils';
import { checkAccess, checkIsFileExist } from '../utils/fs-utils';
import { getSelectorStyles } from '../utils/styles-utils';
import { capitalize, kebabCaseToCamel } from '../utils/string-utils';
import { resolveImportPath } from '../utils/modules-utils';

const EDIT_WARNING = '/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */';

const POT_KIT_GEN_STYLE_TAG_REGEX = /<style pot-kit-gen(.|\n)*?\/?>(.|\n)*?<\/style>/gm;

export async function injectStylesToComponent(
    componentName: string,
    installationConfig: IPotKitInstallationConfig,
    prefixData: IPrefix,
): Promise<IGeneratedData | null> {
    const componentFileName = `${prefixData.camel}${capitalize(kebabCaseToCamel(componentName))}.vue`;
    const componentPath = path.join(installationConfig.components, componentFileName);

    if (!(await checkAccess(componentPath))) return null;

    const styleImportPath = resolveImportPath(
        installationConfig.components,
        installationConfig.styles,
        installationConfig.imports,
    );

    const data = await fs.readFile(componentPath, 'utf-8');
    const clearedData = data.replaceAll(POT_KIT_GEN_STYLE_TAG_REGEX, '').trim();
    const newTag = `<style pot-kit-gen src="${styleImportPath}"></style>`;

    return {
        type: 'component',
        name: componentName,
        data: [clearedData, newTag].join('\n\n'),
        path: componentPath,
    };
}

export async function generateComponents(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: IPrefix,
): Promise<IGeneratedData[]> {
    const { components } = config;

    if (!components) {
        return [];
    }

    const promises = Object.keys(components).map(async componentName => {
        const componentData = components[componentName];
        const enums = await generateComponentEnums(
            componentName,
            config,
            installationConfig,
            prefixData,
        );
        const styles = generateComponentStyles(
            componentName,
            componentData,
            installationConfig,
            prefixData,
        );

        return [enums, styles];
    });

    return Promise.all(promises).then(res => res.flat().filter(v => v.data));
}

function generateComponentStyles(
    componentName: string,
    componentData: Record<string, TCharacteristics>,
    installationConfig: IPotKitInstallationConfig,
    prefixData: IPrefix,
): IGeneratedData {
    const componentStylesPath = path.join(installationConfig.styles, `${componentName}.css`);
    const dataList = Object.keys(componentData).map(
        characteristicName =>
            generateCharacteristicStyle(
                componentName,
                characteristicName,
                componentData[characteristicName],
                installationConfig,
                prefixData,
            ).data,
    );

    const data = dataList
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');

    return {
        type: 'style',
        name: componentName,
        path: componentStylesPath,
        data: `${EDIT_WARNING}\n\n${data}`,
    };
}

function generateCharacteristicStyle(
    componentName: string,
    characteristicName: string,
    characteristic: TCharacteristics,
    installationConfig: IPotKitInstallationConfig,
    prefixData: IPrefix,
): IGeneratedData {
    const className = `.${prefixData.kebab}-${componentName}`;
    const componentStylesPath = path.join(installationConfig.styles, `${componentName}.css`);
    const result = [] as string[];

    for (const variantName in characteristic) {
        const modificator = `._${characteristicName}-${variantName}`;
        const modificatorClassName = `${className}${modificator}`;

        const variant = characteristic[variantName];

        for (const conditionName in variant) {
            const { selector, properties } = variant[conditionName];

            if (!selector || !properties) {
                continue;
            }

            const parsedSelector = selector.replace('&', modificatorClassName);
            const variables = Object.entries(properties).reduce((res, [key, value]) => {
                return {
                    ...res,
                    [`--${prefixData.kebab}-${componentName}-${characteristicName}-${key}`]: value,
                };
            }, {});

            result.push(getSelectorStyles([parsedSelector], variables));
        }
    }

    return {
        type: 'style',
        name: componentName,
        path: componentStylesPath,
        data: result
            .map(v => v.trim())
            .filter(Boolean)
            .join('\n\n'),
    };
}

async function generateComponentEnums(
    componentName: string,
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: IPrefix,
): Promise<IGeneratedData> {
    const characteristics = config?.components?.[componentName] ?? {};
    const componentTypingsPath = path.join(
        installationConfig.types,
        'components',
        `${componentName}.ts`,
    );
    const isComponentTypingExist = await checkIsFileExist(componentTypingsPath);

    let result = isComponentTypingExist ? await fs.readFile(componentTypingsPath, 'utf-8') : '';

    for (const characteristicName in characteristics) {
        const characteristicData = characteristics[characteristicName];
        const enumName = `${componentName}-${characteristicName}`;
        const enumData = Object.keys(characteristicData).reduce(
            (res, key) => ({ ...res, [key]: key }),
            {},
        );

        const [enumConstant, enumType] = getEnum(enumName, prefixData, enumData);

        if (enumConstant) {
            result = patchEnumConst(result, enumConstant, enumName, prefixData);
        }

        if (enumType) {
            result = patchEnumType(result, enumType, enumName, prefixData);
        }
    }

    return {
        type: 'enum',
        name: componentName,
        path: componentTypingsPath,
        data: result,
    };
}
