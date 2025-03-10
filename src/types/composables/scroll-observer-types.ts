export type TScrollTarget = Element | Window | Document;

export type TScrollCallback = (event: Event) => unknown;

export interface IScrollObserver {
    observe: (target: TScrollTarget) => void;
    unobserve: (target: TScrollTarget) => void;
    disconnect: () => void;
};

export interface IScrollConfig {
    endDelay: number;
    onStart: TScrollCallback;
    onProgress: TScrollCallback;
    onEnd: TScrollCallback;
};