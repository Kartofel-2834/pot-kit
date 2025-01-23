export type TValidatorBuilder<T = unknown> = (
    message: string,
    fields?: Array<keyof T>
) => TValidator<T>;

export type TValidator<T = unknown> = (value?: T[keyof T], values?: Partial<T>) => string | null;