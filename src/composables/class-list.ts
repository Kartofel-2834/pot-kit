/**
 * Компосабл для быстрого создания css классов-модификаторов
 *
 * @param properties - объект из которого будут создаваться модификаторы
 *
 * @returns Объект, где каждый ключ - строка в формате `_${property}-${value}`
 * Если value булевое, то просто `_${property}`
 */
export function useClassList(properties: Record<string, unknown>): Record<string, boolean> {
    if (!properties && typeof properties !== 'object') return {};

    return Object.entries(properties).reduce((res, [property, value]) => {
        let key = `_${property}`;
        key += typeof value !== 'boolean' ? `-${value}` : '';

        return { ...res, [key]: Boolean(value) };
    }, {});
}
