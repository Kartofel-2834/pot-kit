// Types
import type { IPotKitConfig } from '../types';
import type { TPrefix } from '../types';

// Helpers
import { getBaseEnum, getEnum } from '../utils/enums-utils';

/** Сгенерировать енамы для всех компонентов */
export function generateEnums(config: IPotKitConfig, prefixData: TPrefix): string {
    return [
        `/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */`,
        getBaseEnum('color', prefixData, config.color ?? {}),
        getBaseEnum('radius', prefixData, config.radius ?? {}),
        getBaseEnum('gap', prefixData, config.gap ?? {}),

        getDevicesEnum(config.breakpoints, prefixData),
        getSizesEnum(config.size, prefixData),
    ]
        .map(v => v.trim())
        .filter(Boolean)
        .join('\n\n');
}

/** Сгенерировать енам с брейкпоинтами для адаптивного дизайна */
function getDevicesEnum(breakpoints: IPotKitConfig['breakpoints'], prefixData: TPrefix): string {
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
        getEnum('device', prefixData, data),
        `export const ${prefixData.upper}_BREAKPOINT: { readonly [key in ${deviceEnumName}]: number; } = {\n${breakpointsValues}\n};`,
        `export const ALL_DEVICES = Object.keys(${prefixData.upper}_BREAKPOINT) as ${deviceEnumName}[];`,
        `export const ALL_DEVICES_REVERSED = Object.keys(${prefixData.upper}_BREAKPOINT).reverse() as ${deviceEnumName}[];`,
    ].join('\n\n');
}

/** Сгенерировать енам с размерами компонентов */
function getSizesEnum(sizes: IPotKitConfig['size'], prefixData: TPrefix): string {
    const sizesEnumData = (sizes ?? []).reduce(
        (res, key) => ({
            ...res,
            [key]: key,
        }),
        {},
    );

    return getEnum('size', prefixData, sizesEnumData);
}
