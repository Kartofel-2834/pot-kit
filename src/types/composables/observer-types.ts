// Types
import type { DirectiveBinding } from "vue";
import type { ArgumentTypes } from "..";

export interface IObserverConfig<T extends Function> {
    /** Кол-во мс. через которое будет вызван onEnd */
    endDelay: number;

    /** Функция вызываемая при начале изменения */
    onStart?: T;

    /** Функия вызываемая на каждое изменение */
    onProgress?: T;

    /** Функия вызываемая через endDelay после изменения */
    onEnd?: T;
}

export interface IObserverDirectiveData<T, V extends Function> {
    config: Partial<IObserverConfig<V>>;
    observer: T;
};

export interface IObserverDirectiveOptions<TObserver, V extends Function> {
    onMount?: (
        el: Element,
        binding: DirectiveBinding<V>,
        currentData: IObserverDirectiveData<TObserver, V> | null
    ) => void,
    
    onUpdate: (
        el: Element,
        binding: DirectiveBinding<V>,
        updatedConfig: Partial<IObserverConfig<V>>,
        prevDirectiveData?: IObserverDirectiveData<TObserver, V> | null
    ) => IObserverDirectiveData<TObserver, V>
    
    onUnmount?: (
        el: Element,
        binding: DirectiveBinding<V>,
        currentData: IObserverDirectiveData<TObserver, V> | null
    ) => void,
} 

export interface IObserver<T, V extends Function> {
    emit: (target: T, ...args: ArgumentTypes<V>) => void;
    clear: () => void;
    remove: (target: T) => boolean;
}
