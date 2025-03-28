// Types
import { IPotKitComponentConfig, IPotKitConfig } from "../types";

// Helpers
import { StringHelper } from "./string-helper";

export function generateComponentDefaults(
    componentName: string,
    componentConfig: IPotKitComponentConfig
): string {
    const constantName = StringHelper.camelCaseToEnumKey(`pot${StringHelper.capitalize(componentName)}Defaults`);

    return `export const ${constantName} = ${JSON.stringify(componentConfig.defaults || {})};`;
}

export function generateDefaults(config: IPotKitConfig): string {
    const componentsDefaults = Object.entries(config.components).map(([name, config]) => {
        return generateComponentDefaults(name, config);
    });

    return componentsDefaults.join('\n\n');
}