// Types
import type { ArgumentTypes } from "@/types";

/**
 * Возращает функцию вызывающую action не сразу,
 * а через delay с момента последнего ее вызова
 */
export function debounce<T extends Function>(action: T, delay: number = 500) {
    let timer = NaN;

    return (...args: ArgumentTypes<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            action(...args);
        }, delay);
    };
}

/**
 * Обработчик событий вызывающихся очень часто, например scroll
*/
export function multiActionListener<T extends Function>(
    listeners: {
        onStart?: T,
        onProgress?: T,
        onEnd?: T
    },
    delay: number = 200
) {
    let isStarted = false;
    let endTimeoutId = NaN;

    return (...args: ArgumentTypes<T>) => {
        if (!isStarted) {
            isStarted = true;
            listeners?.onStart?.(...args);
        }

        listeners?.onProgress?.(...args);
        
        clearTimeout(endTimeoutId);
        endTimeoutId = setTimeout(() => {
            listeners?.onEnd?.(...args);
            isStarted = false;
        }, delay);
    };
}