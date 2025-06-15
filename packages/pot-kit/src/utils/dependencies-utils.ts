// Types
import { TDependencies } from '../types';

// Constants
import { DEPENDENCIES } from '../constants/dependencies';

export function getEmptyDependencies(): TDependencies {
    return {
        components: [],
        composables: [],
        types: [],
    };
}

export function getDependencies(componentsList: string[]): TDependencies {
    const data = componentsList.reduce((res, componentName) => {
        const dependencies = getComponentDependencies(componentName, res);

        res.components.push(...dependencies.components);
        res.composables.push(...dependencies.composables);
        res.types.push(...dependencies.types);

        return res;
    }, getEmptyDependencies());

    return {
        components: [...new Set(data.components)],
        composables: [...new Set(data.composables)],
        types: [...new Set(data.types)],
    };
}

export function getComponentDependencies(
    componentName: string,
    currentDependencies: TDependencies,
): TDependencies {
    if (
        !DEPENDENCIES.components[componentName] ||
        currentDependencies.components.includes(componentName)
    ) {
        return getEmptyDependencies();
    }

    const straightDeps = DEPENDENCIES.components[componentName];
    const result: TDependencies = {
        components: [componentName],
        composables: [],
        types: [],
    };

    result.types = straightDeps.types;

    straightDeps.components.forEach(component => {
        const dependencies = getComponentDependencies(component, result);

        result.components.push(...dependencies.components);
        result.composables.push(...dependencies.composables);
        result.types.push(...dependencies.types);
    });

    straightDeps.composables.forEach(composable => {
        const dependencies = getComposableDependencies(composable, result);

        result.components.push(...dependencies.components);
        result.composables.push(...dependencies.composables);
        result.types.push(...dependencies.types);
    });

    return result;
}

function getComposableDependencies(
    composableName: string,
    currentDependencies: TDependencies,
): TDependencies {
    if (
        !DEPENDENCIES.composables[composableName] ||
        currentDependencies.composables.includes(composableName)
    ) {
        return getEmptyDependencies();
    }

    const straightDeps = DEPENDENCIES.composables[composableName];
    const result: TDependencies = {
        components: [],
        composables: [composableName],
        types: [...straightDeps.types],
    };

    straightDeps.composables.forEach(component => {
        const dependencies = getComposableDependencies(component, result);

        result.components.push(...dependencies.components);
        result.composables.push(...dependencies.composables);
        result.types.push(...dependencies.types);
    });

    return result;
}
