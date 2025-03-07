// Types
import type { IObserverConfig } from "./observer-types";

export type TIntersectionCallback = (
    rect: DOMRectReadOnly,
    ratio: number,
    entry: IntersectionObserverEntry,
    intersectionObserver: IntersectionObserver
) => unknown;

export interface IIntersectionConfig extends IObserverConfig<TIntersectionCallback> {};