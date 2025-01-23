// Types
import type { ComputedRef } from 'vue';

// Enums
import { EDevice } from '@/enums/config';

export type TDevicePropertyValue<T> = T extends unknown[] ? TDevicePropertyValue<T[number]> : T;

export type TDeviceProperties<T> = ComputedRef<
    Partial<{ [Property in keyof T]: TDevicePropertyValue<T[Property]> }>
>

export type TDeviceBreakpointValues<T> = Partial<{
    [Breakpoint in EDevice]: TDevicePropertyValue<T>;
}>

export type TDevicePropertiesBreakpointsValues<T> = Partial<{
    [Property in keyof T]: TDeviceBreakpointValues<T[Property]>
}>