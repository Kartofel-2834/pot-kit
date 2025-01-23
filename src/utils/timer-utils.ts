type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

/**
 * Возращает функцию вызывающую action не сразу,
 * а через delay с момента последнего ее вызова
 */
export function debounce<T extends Function>(action: T, delay: number = 500) {
    let timer: number = NaN;

    return (...args: ArgumentTypes<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            action(...args);
        }, delay);
    };
}