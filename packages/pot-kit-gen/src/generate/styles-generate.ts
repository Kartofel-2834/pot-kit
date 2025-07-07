// Types
import type { IGeneratedData, IPotKitConfig, IPotKitInstallationConfig } from '../types';

// Utils
import { toCssValue } from '../utils/styles-utils';

// Node
import path from 'node:path';

const EDIT_WARNING = '/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */';

/** Генерация css стилей общих для всех компонентов */
export function generateStyles(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
): IGeneratedData | null {
    const data = generateRootVariables(config.variables);

    if (!data) {
        return null;
    }

    return {
        type: 'style',
        name: 'global',
        path: path.join(installationConfig.styles, 'index.css'),
        data: `${EDIT_WARNING}\n\n${data}`,
    };
}

/** Генерация корневых переменных */
function generateRootVariables(globalVariables: IPotKitConfig['variables']): string {
    if (!globalVariables || typeof globalVariables !== 'object') {
        return '';
    }

    const varsStyles = Object.entries(globalVariables).map(([varName, varValue]) => {
        return `    --${varName}: ${toCssValue(varValue)};`;
    });

    return varsStyles.length ? `:root {\n${varsStyles.join('\n')}\n}` : '';
}
