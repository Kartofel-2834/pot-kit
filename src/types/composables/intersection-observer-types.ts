export type TIntersectionCallback = (
    rect: DOMRectReadOnly,
    ratio: number,
    entry: IntersectionObserverEntry,
    intersectionObserver: IntersectionObserver
) => unknown;

export interface IIntersectionConfig {
    endDelay: number;
    onStart: TIntersectionCallback;
    onProgress: TIntersectionCallback;
    onEnd: TIntersectionCallback;
};
