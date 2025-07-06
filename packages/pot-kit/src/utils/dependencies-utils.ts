// Types
import { IPotKitInstallationConfig, TDependencies, TDependenciesMap } from '../types';

// Logger
import { logger } from '../logger';

// Utils
import { fetchModule } from './fetch-utils';

export async function fetchDependenciesMap(
    config: IPotKitInstallationConfig,
): Promise<TDependenciesMap | null> {
    return fetchModule(['dependencies.json'], config)
        .then(data => (data ? JSON.parse(data) : null))
        .catch(err => {
            logger.error('(loadDependencies) Dependencies fetch failed:', err);
        });
}

export function getEmptyDependencies(): TDependencies {
    return {
        components: [],
        composables: [],
        types: [],
    };
}

export function getDependencies(
    componentsList: string[],
    dependenciesMap: TDependenciesMap,
): TDependencies {
    const data = collectDependencies(
        {
            ...getEmptyDependencies(),
            components: componentsList,
        },
        getEmptyDependencies(),
        dependenciesMap,
    );

    return data;
}

function collectDependencies(
    initialDependencies: TDependencies,
    currentDependencies: TDependencies,
    dependenciesMap: TDependenciesMap,
): TDependencies {
    let result = JSON.parse(JSON.stringify(currentDependencies));

    for (const key in initialDependencies) {
        const initialDepKey = key as keyof TDependencies;
        const initialDeps = initialDependencies[initialDepKey];

        for (const item of initialDeps) {
            const currentDeps = currentDependencies[initialDepKey];
            const straightDeps = dependenciesMap?.[initialDepKey]?.[item];

            result[initialDepKey].push(item);

            if (!straightDeps || currentDeps.includes(item)) {
                continue;
            }

            const updatedDeps = collectDependencies(
                straightDeps as TDependencies,
                currentDependencies,
                dependenciesMap,
            );

            result = Object.keys(updatedDeps).reduce((res, key) => {
                const typedKey = key as keyof TDependencies;
                return {
                    ...res,
                    [key]: [...new Set([...res[typedKey], ...updatedDeps[typedKey]])],
                };
            }, result);
        }
    }

    return result;
}
