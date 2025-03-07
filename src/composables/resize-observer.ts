// Types
import type { Directive } from 'vue';
import type { TResizeCallback, IResizeConfig } from '@/types/composables';

// Composables
import { useObserver, useObserverDirective } from './observer';

const defaultConfig: IResizeConfig = {
    endDelay: 300,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

export function useResizeObserver(
    config: Partial<IResizeConfig> = {}
): ResizeObserver {
    const observer = useObserver<Element, TResizeCallback>({ ...defaultConfig, ...config });

    return new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
            observer.emit(entry.target, entry.contentRect, entry.target, entry);
        }
    });
}

export function useResizeDirective(
    baseConfig: Partial<IResizeConfig> = {}
): Directive<Element, TResizeCallback> {
    return useObserverDirective<ResizeObserver, TResizeCallback>({
        onUpdate(el, binding, updatedConfig, prevDirectiveData) {
            if (prevDirectiveData) {
                prevDirectiveData.observer.disconnect();
            }

            const newConfig = {
                ...baseConfig,
                ...(prevDirectiveData?.config ?? {}),
                ...updatedConfig
            };

            const newObserver = useResizeObserver(newConfig);
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


