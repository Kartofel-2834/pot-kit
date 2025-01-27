export type TResizeCallback = (rect: DOMRectReadOnly, target: Element, entry: ResizeObserverEntry) => unknown

export interface IResizeConfig {
    /** Кол-во мс. через которое будет вызван onEnd, после изменения размеров элемента */
    endDelay: number;

    /** Функция вызываемая при начале изменения размеров элемента */
    onStart: TResizeCallback;

    /** Функия вызываемая на каждое изменение размеров элемента */
    onProgress: TResizeCallback;

    /** Функия вызываемая через endDelay после изменения размеров элемента */
    onEnd: TResizeCallback;
}