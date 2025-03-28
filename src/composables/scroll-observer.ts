// Types
import type { Directive, DirectiveBinding } from "vue";
import type { IScrollConfig, IScrollObserver, TScrollCallback, TScrollTarget } from "@/types/composables";

// Composables
import { useObserver } from "./observer";
import { multiActionListener } from "@/utils/timer-utils";

const defaultConfig: IScrollConfig = {
    endDelay: 300,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

const observer = useObserver<TScrollTarget, TScrollCallback>();

export function useScrollObserver(config: Partial<IScrollConfig> = {}): IScrollObserver {
    const currentConfig: IScrollConfig = { ...defaultConfig, ...config };
    const listener = multiActionListener(currentConfig, currentConfig.endDelay);

    function observe(target: TScrollTarget) {
        observer.observe(target, { listener });
        target.addEventListener('scroll', listener);
    }

    function unobserve(target: TScrollTarget) {
        observer.unobserve(target);
        target.removeEventListener('scroll', listener);
    }

    function disconnect() {
        observer.listeners.forEach((data, target) => {
            unobserve(target);
        });

        observer.disconnect();
    }

    return {
        observe,
        unobserve,
        disconnect
    };
}

export function useScrollDirective(config: Partial<IScrollConfig> = {}): Directive {
    const scrollObserversMap: Map<Element, {
        directiveConfig: Partial<IScrollConfig> | null;
        observer: IScrollObserver;
    }> = new Map();

    function updateObserver(el: Element, binding: DirectiveBinding<TScrollCallback>) {
        const currentData = scrollObserversMap.get(el) ?? null;
        const configPayload = getConfigUpdatePayload(binding, currentData?.directiveConfig ?? {});

        if (currentData) {
            if (!configPayload) return;
            currentData.observer.disconnect();
        }

        const currentConfig = {
            ...defaultConfig,
            ...config,
            ...(configPayload ?? {})
        };

        const scrollObserver = useScrollObserver(currentConfig);

        scrollObserver.observe(el);
        scrollObserversMap.set(el, { directiveConfig: configPayload, observer: scrollObserver });
    }

    function getConfigUpdatePayload(
        binding: DirectiveBinding<TScrollCallback>,
        prevConfig: Partial<IScrollConfig> = {},
    ): Partial<IScrollConfig> | null {
        const listener = typeof binding.value === 'function' ? binding.value : undefined;

        if (binding.arg === 'start' && prevConfig.onStart !== listener) {
            return { onStart: listener };
        }
    
        if (binding.arg === 'end' && prevConfig.onEnd !== listener) {
            return { onEnd: listener };
        } 
    
        if (!binding.arg && prevConfig.onProgress !== listener) {
            return { onProgress: listener };
        }

        return null;
    }

    return {
        mounted(el: Element, binding: DirectiveBinding<TScrollCallback>) {
            updateObserver(el, binding);
        },

        updated(el: Element, binding: DirectiveBinding<TScrollCallback>) {
            updateObserver(el, binding);
        },

        unmounted() {
            scrollObserversMap.forEach((data) => data.observer.disconnect());
            scrollObserversMap.clear();
        }
    };
}