// Types
import type { IPotKitConfig } from '../types';

// Utils
import { camelCaseToKebab } from '../utils/string-utils';
import {
    generateModificatorGroup,
    generateVars,
    getModificatorClassName,
    getSelectorStyles,
    toCssValue,
} from '../utils/styles-utils';

const EDIT_WARNING = '/* NOT EDIT! THIS STYLES GENERATED AUTOMATICALLY! */';

/** Генерация css стилей общих для всех компонентов */
export function generateGlobalStyles(config: IPotKitConfig): string {
    return [
        EDIT_WARNING,
        generateRootVariables(config.variables),
        generateColors(config.color),
        generateModificatorGroup('radius', config.radius ?? {}),
        generateModificatorGroup('gap', config.gap ?? {}),
        generateModificatorGroup('row-gap', config.gap ?? {}),
        generateModificatorGroup('column-gap', config.gap ?? {}),
    ]
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
}

/** Генерация корневых переменных */
function generateRootVariables(globalVariables: IPotKitConfig['variables']): string {
    if (!globalVariables || typeof globalVariables !== 'object') {
        return '';
    }

    const varsStyles = Object.entries(globalVariables).map(([varName, varValue]) => {
        const name = !varName.includes('-') ? camelCaseToKebab(varName) : varName;

        return `    --${name}: ${toCssValue(varValue)};`;
    });

    return varsStyles.length ? `:root {\n${varsStyles.join('\n')}\n}` : '';
}

/** Генерация стилией цветовых тем */
function generateColors(colorsConfiguration: IPotKitConfig['color']): string {
    if (!colorsConfiguration) {
        return '';
    }

    const modificators = Object.entries(colorsConfiguration).map(([colorName, config]) => {
        const className = getModificatorClassName('color', colorName);
        const vars = generateVars('color', config);

        return getSelectorStyles([className], vars);
    });

    return modificators
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
}
