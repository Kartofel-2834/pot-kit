/**
 * Возращает функцию вызывающую action не сразу,
 * а через delay с момента последнего ее вызова
 */
export function debounce(action: Function, delay: number = 500) {
    let timer: number = NaN;

    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            action();
        }, delay);
    };
}