// Types
import type { IObserverConfig } from "./observer-types";

export type TScrollTarget = Element | Window | Document;

export type TScrollCallback = (event: Event) => unknown;

export interface IScrollObserver {
    observe: (target: TScrollTarget) => void;
    unobserve: (target: TScrollTarget) => void;
    disconnect: () => void;
};

export interface IScrollConfig extends IObserverConfig<TScrollCallback> {};