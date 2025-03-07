// Types
import type { Directive, DirectiveBinding } from "vue";
import type { ArgumentTypes } from "@/types";
import type { IObserver, IObserverConfig, IObserverDirectiveData, IObserverDirectiveOptions } from "@/types/composables";

// Utils
import { multiActionListener } from "@/utils/timer-utils";

export function useObserver<T, V extends Function>(
    config: IObserverConfig<V>
): IObserver<T, V> {
    type TListener = (...args: ArgumentTypes<V>) => void;
    const listeners = new Map<T, TListener>();

    function emit(target: T, ...args: ArgumentTypes<V>) {
        if (!listeners.has(target)) {
            listeners.set(target, multiActionListener(config, config.endDelay));
        }

        const currentListener = listeners.get(target);

        if (typeof currentListener === 'function') {
            currentListener(...args);
        }
    }

    function clear() {
        listeners.clear();
    }

    function remove(target: T): boolean {
        return listeners.delete(target);
    }

    return {
        emit,
        clear,
        remove
    };
}

export function useObserverDirective<TObserver, V extends Function>(
    directiveConfig: IObserverDirectiveOptions<TObserver, V>
): Directive<Element, V> {
    const observersMap: Map<Element, IObserverDirectiveData<TObserver, V>> = new Map(); 

    function setupDirective(el: Element, binding: DirectiveBinding<V>) {
        const currentData = observersMap.get(el);
        let isUpdated = false;

        const listener = typeof binding.value === 'function' ? binding.value : undefined;
        const configPayload: Partial<IObserverConfig<V>> = {};

        if (binding.arg === 'start' && (!currentData || currentData.config.onStart !== listener)) {
            configPayload.onStart = listener;
            isUpdated = true;
        } else if (binding.arg === 'end' && (!currentData || currentData.config.onEnd !== listener)) {
            configPayload.onEnd = listener;
            isUpdated = true;
        } else if (!binding.arg && (!currentData || currentData.config.onProgress !== listener)) {
            configPayload.onProgress = listener;
            isUpdated = true;
        }

        if (!isUpdated) {
            return;
        }

        const newData = directiveConfig.onUpdate(
            el,
            binding,
            configPayload,
            currentData ?? null
        );
        
        observersMap.set(el, newData);
    }

    return {
        mounted(el: Element, binding: DirectiveBinding<V>) {
            const data = observersMap.get(el) ?? null;
            directiveConfig?.onMount?.(el, binding, data);
            setupDirective(el, binding);
        },

        updated(el: Element, binding: DirectiveBinding<V>) {
            setupDirective(el, binding);
        },

        unmounted(el: Element, binding: DirectiveBinding<V>) {
            const data = observersMap.get(el) ?? null;
            directiveConfig?.onUnmount?.(el, binding, data);
        }
    };
}