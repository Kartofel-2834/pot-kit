export type TCamelToKebab<S extends string> = S extends `${infer T}${infer U}`
    ? U extends Uncapitalize<U>
        ? `${Uncapitalize<T>}${TCamelToKebab<U>}`
        : `${Uncapitalize<T>}-${TCamelToKebab<U>}`
    : '';

export type TKebabToCamel<T extends string> = T extends `${infer H}-${infer J}${infer K}`
    ? `${Uncapitalize<H>}${Capitalize<J>}${TKebabToCamel<K>}` 
    : T;