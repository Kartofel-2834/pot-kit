// Types
import type { Directive, DirectiveBinding } from 'vue';
import type { TResizeCallback, IResizeConfig } from '@/types/composables';

// Vue
import { ref, computed } from 'vue';

const defaultConfig: IResizeConfig = {
    endDelay: 200,
    onStart: () => undefined,
    onProgress: () => undefined,
    onEnd: () => undefined,
};

export function useResize(config: Partial<IResizeConfig> = {}): Directive {
    let isStarted = false;
    let endTimeoutId = NaN;
    
    const directiveConfig = ref<Partial<IResizeConfig>>({});
    const currentConfig = computed<IResizeConfig>(() => ({
        ...defaultConfig,
        ...config,
        ...directiveConfig.value
    }));

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
            if (!isStarted) {
                isStarted = true;
                currentConfig.value.onStart(entry.contentRect, entry.target, entry);
            }

            currentConfig.value.onProgress(entry.contentRect, entry.target, entry);
            
            clearTimeout(endTimeoutId);
            endTimeoutId = setTimeout(() => {
                currentConfig.value.onEnd(entry.contentRect, entry.target, entry);
                isStarted = false;
            }, currentConfig.value.endDelay);
        }
    });

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