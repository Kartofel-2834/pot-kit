// Types
import type { IPotKitConfig } from "../types";

// Helpers
import { EnumsHelper } from "../helpers/enums-helper";

export class PotKitEnumsGenerator {
    /** Сгенерировать енамы для всех компонентов */
    static generate(config: IPotKitConfig): string {
        return [
            `/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */`,
            EnumsHelper.getBaseEnum('color', config.color),
            EnumsHelper.getBaseEnum('radius', config.radius),
            EnumsHelper.getBaseEnum('gap', config.gap),
            
            PotKitEnumsGenerator.getDevicesEnum(config.breakpoints),
            PotKitEnumsGenerator.getSizesEnum(config.size),
        ].join('\n\n');
    }

    /** Сгенерировать енам с брейкпоинтами для адаптивного дизайна */
    private static getDevicesEnum(breakpoints: IPotKitConfig['breakpoints']): string {
        const data = Object.entries(breakpoints).reduce((res, [device]) => ({
            ...res,
            [device]: device
        }), {});
    
        const breakpointsValues = Object.entries(breakpoints)
            .map(([key, value]) => {
                if (key === '') {
                    return '';
                }
    
                return `    ${key}: ${value}`;
            })
            .filter(Boolean)
            .join(',\n');
    
        const breakpointsData = `export const POT_BREAKPOINT: { readonly [key in EPotDevice]: number; } = {\n${breakpointsValues}\n};`;
    
        return `${EnumsHelper.getEnum('device', data)}\n\n${breakpointsData}`;
    }

    /** Сгенерировать енам с размерами компонентов */
    private static getSizesEnum(sizes: IPotKitConfig['size']): string {
        const sizesEnumData = sizes.reduce((res, key) => ({
            ...res,
            [key]: key
        }), {});
    
        return EnumsHelper.getEnum('size', sizesEnumData);
    }
}

// function getSizesEnum(sizes: IPotKitConfig['size']): string {
//     const sizesEnumData = sizes.reduce((res, key) => ({
//         ...res,
//         [key]: key
//     }), {});

//     return EnumsHelper.getEnum('size', sizesEnumData);
// }

// function getDevicesEnum(breakpoints: IPotKitConfig['breakpoints']): string {
//     const data = Object.entries(breakpoints).reduce((res, [device]) => ({
//         ...res,
//         [device]: device
//     }), {});

//     const breakpointsValues = Object.entries(breakpoints)
//         .map(([key, value]) => {
//             if (key === '') {
//                 return '';
//             }

//             return `    ${key}: ${value}`;
//         })
//         .filter(Boolean)
//         .join(',\n');

//     const breakpointsData = `export const POT_BREAKPOINT: { readonly [key in EPotDevice]: number; } = {\n${breakpointsValues}\n};`;

//     return `${EnumsHelper.getEnum('device', data)}\n\n${breakpointsData}`;
// }

// export function generateEnums(config: IPotKitConfig): string {
//     return [
//         `/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */`,
//         EnumsHelper.getBaseEnum('color', config.color),
//         EnumsHelper.getBaseEnum('radius', config.radius),
//         EnumsHelper.getBaseEnum('gap', config.gap),
//         getDevicesEnum(config.breakpoints),
//         getSizesEnum(config.size),
//     ].join('\n\n');
// }