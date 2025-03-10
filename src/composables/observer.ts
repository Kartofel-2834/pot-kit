// Types
import type { ArgumentTypes } from "@/types";
import type { IObserver, IObserverData } from "@/types/composables";

export function useObserver<
    T,
    V extends Function,
    C extends IObserverData<V> = IObserverData<V> 
>(): IObserver<T, V, C> {
    const listeners = new Map<T, C>();

    function emit(target: T, ...args: ArgumentTypes<V>) {
        if (!listeners.has(target)) {
            throw new Error(`[useObserver/emit]: Target ${target} is not observed`);
        }

        const data = listeners.get(target);

        if (data && typeof data.listener === 'function') { 
            data.listener(...args);
        }
    }

    function observe(target: T, data: C) {
        listeners.set(target, data); 
    }

    function disconnect() {
        listeners.clear();
    }

    function unobserve(target: T): boolean {
        return listeners.delete(target);
    }

    return {
        listeners,
        emit,
        observe,
        disconnect,
        unobserve,
    };
}