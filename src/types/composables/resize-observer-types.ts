export type TResizeCallback = (rect: DOMRectReadOnly, target: Element, entry: ResizeObserverEntry) => unknown;

export interface IResizeConfig {
    endDelay: number;
    onStart: TResizeCallback;
    onProgress: TResizeCallback;
    onEnd: TResizeCallback;
};

export interface IResizeObserver {
    observe(target: Element, options?: ResizeObserverOptions): void;
    unobserve(target: Element): void;
    disconnect(): void;
}