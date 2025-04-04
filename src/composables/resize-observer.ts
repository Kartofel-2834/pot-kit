// Types
import type { Directive, DirectiveBinding } from 'vue';
import type { TResizeCallback, IResizeConfig, IResizeObserver } from '@/types/composables';

// Composables
import { useObserver } from './observer';

// Helpers
import { TimerHelper } from '@/helpers/timer-helper';

const defaultConfig: IResizeConfig = {
    endDelay: 300,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

const observer = useObserver<Element, TResizeCallback>();

const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
        if (observer.listeners.has(entry.target)) {
            observer.emit(entry.target, entry.contentRect, entry.target, entry);
        }
    }
});

export function useResizeObserver(config: Partial<IResizeConfig> = {}): IResizeObserver {
    const currentConfig: IResizeConfig = { ...defaultConfig, ...config };
    const listener = TimerHelper.multiActionListener(currentConfig, currentConfig.endDelay);
    
    function observe(target: Element, options?: ResizeObserverOptions) {
        observer.observe(target, { listener });
        resizeObserver.observe(target, options);
    }
    
    function unobserve(target: Element) {
        observer.unobserve(target);
        resizeObserver.unobserve(target);
    }

    function disconnect() {
        observer.disconnect();
        resizeObserver.disconnect();
    }
    
    return {
        observe,
        unobserve,
        disconnect
    };
}

export function useResizeDirective(config: Partial<IResizeConfig> = {}): Directive {
    const resizeObserversMap: Map<Element, {
        directiveConfig: Partial<IResizeConfig> | null;
        observer: IResizeObserver;
    }> = new Map();

    function updateObserver(el: Element, binding: DirectiveBinding<TResizeCallback>) {
        const currentData = resizeObserversMap.get(el) ?? null;
        const configPayload = getConfigUpdatePayload(binding, currentData?.directiveConfig ?? {});

        if (currentData) {
            if (!configPayload) return;
            currentData.observer.unobserve(el);
        }

        const currentConfig = {
            ...defaultConfig,
            ...config,
            ...(configPayload ?? {})
        };

        const potResizeObserver = useResizeObserver(currentConfig);

        potResizeObserver.observe(el);
        resizeObserversMap.set(el, { directiveConfig: configPayload, observer: potResizeObserver });
    }

    function getConfigUpdatePayload(
        binding: DirectiveBinding<TResizeCallback>,
        prevConfig: Partial<IResizeConfig> = {},
    ): Partial<IResizeConfig> | null {
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
        mounted(el: Element, binding: DirectiveBinding<TResizeCallback>) {
            updateObserver(el, binding);
        },

        updated(el: Element, binding: DirectiveBinding<TResizeCallback>) {
            updateObserver(el, binding);
        },

        unmounted() {
            resizeObserversMap.forEach((data) => data.observer.disconnect());
            resizeObserversMap.clear();
        }
    };
}