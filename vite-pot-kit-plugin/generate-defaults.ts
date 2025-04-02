// Types
import { IPotComponentConfig, IPotKitConfig } from "../types";

// Helpers
import { StringHelper } from "../helpers/string-helper";

export class PotKitDefaultsGenerator {
    /** Генерация значений по-умолчанию для пропсов всех компонентов */
    static generate(config: IPotKitConfig): string {
        const componentsDefaults = Object.entries(config.components).map(([name, config]) => {
            return PotKitDefaultsGenerator.generateComponentDefaults(name, config);
        });

        return componentsDefaults.join('\n\n');
    }

    /** Генерация значений по-умолчанию для пропсов компонента */
    private static generateComponentDefaults(
        componentName: string,
        componentConfig: IPotComponentConfig
    ): string {
        const constantName = StringHelper.camelCaseToEnumKey(`pot${StringHelper.capitalize(componentName)}Defaults`);
        const data = JSON.stringify(componentConfig.defaults || {}, (key, value) => { 
            return typeof value === 'function' ? `__potfn__${value.toString()}__potfn__` : value; 
        });
    
        return `export const ${constantName}: Record<string, unknown> = ${data};`;
    }
}