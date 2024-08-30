export function pick<T extends Object>(someObject: T, keys: (keyof T)[]): Partial<T> {
    if (!someObject || typeof someObject !== 'object') {
        return someObject;
    }

    const allKeys = Object.keys(someObject) as (keyof T)[];

    return allKeys.reduce((res: Partial<T>, key) => {
        if (!keys.includes(key)) return res;

        return {
            ...res,
            [key]: someObject[key],
        };
    }, {});
}
