// Types
import type { Directive } from "vue";
import type { IScrollConfig, IScrollObserver, TScrollCallback, TScrollTarget } from "@/types/composables";

// Composables
import { useObserver, useObserverDirective } from "./observer";

const defaultConfig: IScrollConfig = {
    endDelay: 300,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

export function useScrollObserver(
    config: Partial<IScrollConfig> = {}
): IScrollObserver {
    const scrollHandlersMap: Map<TScrollTarget, TScrollCallback> = new Map();

    const observer = useObserver<TScrollTarget, TScrollCallback>({
        ...defaultConfig,
        ...config
    });
    
    function observe(target: TScrollTarget) {
        const scrollHandler = (event: Event) => {
            observer.emit(target, event);
        };

        scrollHandlersMap.set(target, scrollHandler);
        target.addEventListener('scroll', scrollHandler);
    }

    function unobserve(target: TScrollTarget) {
        const scrollHandler = scrollHandlersMap.get(target);

        if (scrollHandler) {
            target.removeEventListener('scroll', scrollHandler);
            scrollHandlersMap.delete(target);
        }
    }

    function disconnect() {
        scrollHandlersMap.forEach((scrollHandler, target) => {
            target.removeEventListener('scroll', scrollHandler);
        });

        scrollHandlersMap.clear();
    }

    return {
        observe,
        unobserve,
        disconnect
    };
}

export function useScrollDirective(
    baseConfig: Partial<IScrollConfig> = {},
): Directive<Element, TScrollCallback> {
    return useObserverDirective<IScrollObserver, TScrollCallback>({
        onUpdate(el, binding, updatedConfig, prevDirectiveData) {
            if (prevDirectiveData) {
                prevDirectiveData.observer.disconnect();
            }

            const newConfig = {
                ...baseConfig,
                ...(prevDirectiveData?.config ?? {}),
                ...updatedConfig
            };

            const newObserver = useScrollObserver(newConfig);
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