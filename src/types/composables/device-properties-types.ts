// Types
import type { ComputedRef } from 'vue';

// Enums
import { EDevices } from '@/enums/config';

export type DevicePropertyValue<T> = T extends unknown[] ? DevicePropertyValue<T[number]> : T;

export type DeviceProperties<T> = ComputedRef<
    Partial<{ [Property in keyof T]: DevicePropertyValue<T[Property]> }>
>

export type DeviceBreakpointValues<T> = Partial<{
    [Breakpoint in EDevices]: DevicePropertyValue<T>;
}>

export type DevicePropertiesBreakpointsValues<T> = Partial<{
    [Property in keyof T]: DeviceBreakpointValues<T[Property]>
}>