export type ValidatorBuilder<T = unknown> = (
    message: string,
    fields?: Array<keyof T>
) => Validator<T>;

export type Validator<T = unknown> = (value?: T[keyof T], values?: Partial<T>) => string | null;