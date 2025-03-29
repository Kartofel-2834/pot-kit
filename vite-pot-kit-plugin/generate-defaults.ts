// Types
import { IPotKitComponentConfig, IPotKitConfig } from "../types";

// Helpers
import { StringHelper } from "./string-helper";

export function generateComponentDefaults(
    componentName: string,
    componentConfig: IPotKitComponentConfig
): string {
    const constantName = StringHelper.camelCaseToEnumKey(`pot${StringHelper.capitalize(componentName)}Defaults`);
    const data = JSON.stringify(componentConfig.defaults || {}, (key, value) => { 
        return typeof value === 'function' ? `__potfn__${value.toString()}__potfn__` : value; 
    });

    return `export const ${constantName}: Record<string, unknown> = ${data};`;
}

export function generateDefaults(config: IPotKitConfig): string {
    const componentsDefaults = Object.entries(config.components).map(([name, config]) => {
        return generateComponentDefaults(name, config);
    });

    return componentsDefaults.join('\n\n');
}