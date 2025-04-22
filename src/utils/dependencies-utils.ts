// Types
import { TDependencies } from "../types";

export function getEmptyDependencies(): TDependencies {
    return {
        components: [],
        composables: [],
        types: []
    };
}

export function getComponentDependencies(
    componentName: string,
    currentDependencies: TDependencies,
    componentsDeps: Record<string, TDependencies>,
    composablesDeps: Record<string, TDependencies>
): TDependencies {
    if (currentDependencies.components.includes(componentName)) {
        return {
            components: [],
            composables: [],
            types: []
        };
    };

    const straightDeps = componentsDeps[componentName];
    const result: TDependencies = {
        components: [componentName],
        composables: [],
        types: [],
    };

    result.types = straightDeps.types.filter((typeName) => !currentDependencies.types.includes(typeName));

    straightDeps.components.forEach((component) => {
        const dependencies = getComponentDependencies(component, result, componentsDeps, composablesDeps);

        result.components.push(...dependencies.components);
        result.composables.push(...dependencies.composables);
        result.types.push(...dependencies.types);
    });

    straightDeps.composables.forEach((composable) => {
        const dependencies = getComposableDependencies(composable, result, composablesDeps);

        result.components.push(...dependencies.components);
        result.composables.push(...dependencies.composables);
        result.types.push(...dependencies.types);
    });

    return result;
}

function getComposableDependencies(
    composableName: string,
    currentDependencies: TDependencies,
    composablesDeps: Record<string, TDependencies>
): TDependencies {
    if (currentDependencies.composables.includes(composableName)) {
        return getEmptyDependencies(); 
    };

    const straightDeps = composablesDeps[composableName]; 
    const types = straightDeps.types.filter((typeName) => !currentDependencies.types.includes(typeName));

    return {
        components: [],
        composables: [composableName],
        types,
    };
}