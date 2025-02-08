// Types
import type { Directive, DirectiveBinding } from 'vue';
import type { TResizeCallback, IResizeConfig } from '@/types/composables';

// Vue
import { ref, computed } from 'vue';
import { multiActionListener } from '@/utils/timer-utils';

const defaultConfig: IResizeConfig = {
    endDelay: 200,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

export function useResizeObserver(config: Partial<IResizeConfig> = {}): ResizeObserver {
    const listeners = new Map<Element, TResizeCallback>();
    const currentConfig = {
        ...defaultConfig,
        ...config,
    };

    return new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
            if (!listeners.has(entry.target)) {
                listeners.set(entry.target, multiActionListener(currentConfig, currentConfig.endDelay));
            }

            const currentListener = listeners.get(entry.target);

            if (typeof currentListener === 'function') {
                currentListener(entry.contentRect, entry.target, entry);
            }
        }
    });
}

export function useResize(config: Partial<IResizeConfig> = {}): Directive {
    const directiveConfig = ref<Partial<IResizeConfig>>({});
    const mixedConfig = computed<Partial<IResizeConfig>>(() => ({
        ...config,
        ...directiveConfig.value
    }));

    const observer = useResizeObserver(mixedConfig.value);

    function setupDirective(el: Element, binding: DirectiveBinding<TResizeCallback>) {
        observer.observe(el);

        if (!binding.value || typeof binding.value !== 'function') {
            return;
        }

        if (binding.arg === 'start') {
            directiveConfig.value.onStart = binding.value;
        } else if (binding.arg === 'end') {
            directiveConfig.value.onEnd = binding.value;
        } else if (!binding.arg) {
            directiveConfig.value.onProgress = binding.value;
        }
    }

    return {
        mounted: setupDirective,

        updated: setupDirective,

        unmounted() {
            observer.disconnect();
        }
    };
}