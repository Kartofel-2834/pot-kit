// Types
import type { Directive, DirectiveBinding } from 'vue';
import type { IIntersectionConfig } from '@/types/composables';

// Helpers
import { TimerHelper } from '@/helpers/timer-helper';

const defaultConfig: IIntersectionConfig = {
    endDelay: 300,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

export function useIntersectionObserver(
    config: Partial<IIntersectionConfig> = {},
    options: IntersectionObserverInit = {},
): IntersectionObserver {
    const currentConfig = { ...defaultConfig, ...config };

    const listener = TimerHelper.multiActionListener(currentConfig, currentConfig.endDelay);

    return new IntersectionObserver((entries, intersectionObserver) => {
        for (const entry of entries) {
            listener(
                entry.boundingClientRect,
                entry.intersectionRatio,
                entry,
                intersectionObserver
            );
        }
    }, options);
} 

export function useIntersectionDirective(
    config: Partial<IIntersectionConfig> = {},
    options: IntersectionObserverInit = {},
): Directive<Element, IntersectionObserverInit> {
    const intersectionObserversMap: Map<Element, {
        options: IntersectionObserverInit | null;
        observer: IntersectionObserver;
    }> = new Map();
 
    const defaultObserver = useIntersectionObserver(config, options);

    function updateObserver(el: Element, binding: DirectiveBinding<IntersectionObserverInit>) {
        const currentData = intersectionObserversMap.get(el) ?? null;

        const directiveOptions = binding.value && typeof binding.value === 'object' ? binding.value : null;

        if (!currentData && directiveOptions) {
            const currentObserver = useIntersectionObserver(config, { ...options, ...directiveOptions });
            currentObserver.observe(el);
            intersectionObserversMap.set(el, { options: directiveOptions, observer: currentObserver }); 
            return;
        }

        if (!currentData && !directiveOptions) {
            defaultObserver.observe(el);
            intersectionObserversMap.set(el, { options: null, observer: defaultObserver });
            return;
        }

        if (currentData && !directiveOptions && currentData.observer !== defaultObserver) {
            currentData.observer.unobserve(el);
            defaultObserver.observe(el);
            intersectionObserversMap.set(el, { options: null, observer: defaultObserver });
            return;
        }

        if (
            currentData &&
            directiveOptions &&
            JSON.stringify(currentData.options) !== JSON.stringify(directiveOptions)
        ) {
            const currentObserver = useIntersectionObserver(config, { ...options, ...directiveOptions });
            currentData.observer.unobserve(el);
            currentObserver.observe(el);
            intersectionObserversMap.set(el, { options: directiveOptions, observer: currentObserver });
            return;
        }
    }
 
    return {
        mounted(el: Element, binding: DirectiveBinding<IntersectionObserverInit>) {
            updateObserver(el, binding);
        },
 
        updated(el: Element, binding: DirectiveBinding<IntersectionObserverInit>) {
            updateObserver(el, binding);
        },
 
        unmounted(el: Element) {
            const currentData = intersectionObserversMap.get(el);

            if (!currentData) {
                return;
            }

            currentData.observer.unobserve(el);
            intersectionObserversMap.delete(el);
        }
    };
}