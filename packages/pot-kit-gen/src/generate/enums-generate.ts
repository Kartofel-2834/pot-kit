// Types
import type { IGeneratedData, IPotKitConfig, IPotKitInstallationConfig } from '../types';
import type { IPrefix } from '../types';

// Node
import path from 'node:path';

// Helpers
import { getEnum } from '../utils/enums-utils';

const EDIT_WARNING = '/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */';

/** Сгенерировать енамы для всех компонентов */
export function generateEnums(
    config: IPotKitConfig,
    installationConfig: IPotKitInstallationConfig,
    prefixData: IPrefix,
): IGeneratedData | null {
    const data = getDevicesEnum(config.breakpoints, prefixData);

    if (!data) {
        return null;
    }

    return {
        type: 'enum',
        name: 'global',
        path: path.join(installationConfig.types, 'index.ts'),
        data: `${EDIT_WARNING}\n\n${data}`,
    };
}

/** Сгенерировать енам с брейкпоинтами для адаптивного дизайна */
function getDevicesEnum(breakpoints: IPotKitConfig['breakpoints'], prefixData: IPrefix): string {
    const data = Object.entries(breakpoints ?? {}).reduce(
        (res, [device]) => ({
            ...res,
            [device]: device,
        }),
        {},
    );

    const deviceEnumName = `E${prefixData.camel}Device`;
    const breakpointsValues = Object.entries(breakpoints ?? {})
        .map(([key, value]) => {
            if (key === '') {
                return '';
            }

            return `    ${key}: ${value}`;
        })
        .filter(Boolean)
        .join(',\n');

    return [
        ...getEnum('device', prefixData, data),
        `export const ${prefixData.upper}_BREAKPOINT: { readonly [key in ${deviceEnumName}]: number; } = {\n${breakpointsValues}\n};`,
        `export const ALL_DEVICES = Object.keys(${prefixData.upper}_BREAKPOINT) as ${deviceEnumName}[];`,
        `export const ALL_DEVICES_REVERSED = Object.keys(${prefixData.upper}_BREAKPOINT).reverse() as ${deviceEnumName}[];`,
    ].join('\n\n');
}
