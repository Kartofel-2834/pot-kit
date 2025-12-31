// Types
import { IPrefix } from '../types';

// Node
import path from 'path';

// Utils
import {
    camelCaseToKebab,
    capitalize,
    kebabCaseToCamel,
    kebabCaseToEnumKey,
    snakeCaseToKebab,
} from './string-utils';

/** Подготовить префикс к вставке в компоненты */
export function preparePrefix(prefix: string): IPrefix {
    prefix = camelCaseToKebab(snakeCaseToKebab(prefix));

    return {
        kebab: prefix,
        camel: capitalize(kebabCaseToCamel(prefix)),
        upper: kebabCaseToEnumKey(prefix),
    };
}

/** Подстановка шорткатов в пути импортов в компонентах */
export function resolveImportPath(
    fromPath: string,
    toPath: string,
    importsConfig: Record<string, string>,
): string {
    const preaprePath = (v: string) => v.replaceAll(/(\/|\\)+/gm, '/').replace(/\/$/, '');

    for (const key in importsConfig) {
        if (toPath.startsWith(importsConfig[key])) {
            return preaprePath(toPath.replaceAll(importsConfig[key], key)) || '.';
        }
    }

    return preaprePath(path.relative(fromPath, toPath)) || '.';
}

/** Подставляет значения в шаблон pot-kit */
export function parseTemplate(template: string, data: Record<string, string>): string {
    const patternStart = '<%';
    const patternEnd = '%>';

    let result: string = '';
    let buffer: string = '';

    for (const char of template) {
        if (buffer) {
            buffer += char;
        } else {
            result += char;
        }

        if (result.endsWith(patternStart)) {
            result = result.slice(0, -patternStart.length);
            buffer = patternStart;
        }

        if (buffer.endsWith(patternEnd)) {
            const value = data[buffer.slice(patternStart.length, -patternEnd.length)];

            result += value || buffer;
            buffer = '';
        }
    }

    if (buffer) result += buffer;

    return result;
}
