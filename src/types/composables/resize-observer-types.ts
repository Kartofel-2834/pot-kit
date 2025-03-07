// Types
import type { IObserverConfig } from "./observer-types";

export type TResizeCallback = (rect: DOMRectReadOnly, target: Element, entry: ResizeObserverEntry) => unknown;

export interface IResizeConfig extends IObserverConfig<TResizeCallback> {};