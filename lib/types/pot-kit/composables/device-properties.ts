export type TDevicePropertyValue<T> = T extends unknown[] ? TDevicePropertyValue<T[number]> : T;

export type TDeviceProperties<T> = {
    [Property in keyof T]: TDevicePropertyValue<T[Property]>;
}