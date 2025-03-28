// Types
import type { ArgumentTypes } from "..";

export interface IObserverData<V extends Function> { 
    listener: (...args: ArgumentTypes<V>) => void
};

export interface IObserver<
    T,
    V extends Function,
    C extends IObserverData<V> = IObserverData<V>
> {
    listeners: Map<T, C>;
    emit: (target: T, ...args: ArgumentTypes<V>) => void;
    disconnect: () => void;
    unobserve: (target: T) => boolean;
    observe: (target: T, data: C) => void;
}
