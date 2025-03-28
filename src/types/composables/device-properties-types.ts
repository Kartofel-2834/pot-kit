// Types
import type { EPotDevice } from '@/enums/preset';

export type TDevicePropertyValue<T> = T extends unknown[] ? TDevicePropertyValue<T[number]> : T;

export type TDeviceProperties<T> = {
    [Property in keyof T]?: TDevicePropertyValue<T[Property]>
}

export type TDeviceBreakpointValues<T> = Partial<{
    [Breakpoint in EPotDevice]: TDevicePropertyValue<T>;
}>

export type TDevicePropertiesBreakpointsValues<T> = Partial<{
    [Property in keyof T]: TDeviceBreakpointValues<T[Property]>
}>