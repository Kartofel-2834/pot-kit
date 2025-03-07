// Types
import type { Directive } from 'vue';
import type { IIntersectionConfig, TIntersectionCallback } from '@/types/composables';

// Composables
import { useObserver, useObserverDirective } from './observer';

const defaultConfig: IIntersectionConfig = {
    endDelay: 300,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

export function useIntersectionObserver(
    options: IntersectionObserverInit = {},
    config: Partial<IIntersectionConfig> = {},
): IntersectionObserver {
    const observer = useObserver<Element, TIntersectionCallback>({ ...defaultConfig, ...config });

    return new IntersectionObserver((entries, intersectionObserver) => {
        for (const entry of entries) {
            observer.emit(
                entry.target,
                entry.boundingClientRect,
                entry.intersectionRatio,
                entry,
                intersectionObserver
            );   
        }
    }, options);
}

export function useIntersectionDirective(
    options: IntersectionObserverInit = {},
    baseConfig: Partial<IIntersectionConfig> = {},
): Directive<Element, TIntersectionCallback> {
    return useObserverDirective<IntersectionObserver, TIntersectionCallback>({
        onUpdate(el, binding, updatedConfig, prevDirectiveData) {
            if (prevDirectiveData) {
                prevDirectiveData.observer.disconnect();
            }

            const newConfig = {
                ...baseConfig,
                ...(prevDirectiveData?.config ?? {}),
                ...updatedConfig
            };

            const newObserver = useIntersectionObserver(options, newConfig); 
            newObserver.observe(el);

            return {
                config: newConfig,
                observer: newObserver
            };
        },

        onUnmount(el, binding, currentDirectiveData) {
            if (currentDirectiveData) {
                currentDirectiveData.observer.disconnect();
            }
        }
    });
}