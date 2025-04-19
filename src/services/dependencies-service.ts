// Types
import { TComponentDependencies, TComposableDependencies } from "../../types";

// Dependencies maps
import COMPOSABLES from '../dependencies/composables.json';
import COMPONENTS from '../dependencies/components.json';

export class DependenciesService {
    /** Получить набор зависимостей, который нужно установить в проект */
    static getDependencies(componentsList: string[]): TComponentDependencies {
        const dirtyDeps = componentsList.reduce((res, componentName) => {
            const { components, composables, types } = DependenciesService.getComponentDependencies(componentName);
    
            return {
                components: [...res.components, ...components, componentName],
                composables: [...res.composables, ...composables],
                types: [...res.types, ...types],
            };
        }, {
            components: [] as string[],
            composables: [] as string[],
            types: [] as string[]
        });
    
        return {
            components: [...(new Set(dirtyDeps.components))],
            composables: [...(new Set(dirtyDeps.composables))],
            types: [...(new Set(dirtyDeps.types))]
        };
    }

    private static getComponentDependencies(componentName: string): TComponentDependencies {
        const data = (COMPONENTS as Record<string, TComponentDependencies>)[componentName] ;
        const result: TComponentDependencies = {
            components: [...data.components],
            composables: [...data.composables],
            types: [...data.types]
        };
    
        data.composables.forEach((composableName) => {
            const composableData = (COMPOSABLES as Record<string, TComposableDependencies>)[composableName];
            result.types.push(...composableData.types);
        });
    
        data.components.forEach((subComponentName) => {
            const componentData = DependenciesService.getComponentDependencies(subComponentName);
    
            result.components.push(...componentData.components);
            result.composables.push(...componentData.composables);
            result.types.push(...componentData.types);
        });
    
        return result;
    }
}