// Types
import type { ComputedRef } from 'vue';

export type DevicePropertiesOptions = Partial<{
    properties: Record<string, string | string[]>;
    devices: string | string[];
    breakpoints: Record<string, number>;
    separator: string;
}>;

export type DeviceProperties = ComputedRef<Record<string, string | null>>;

export type DevicePropertiesBreakpointValues = Record<string, Record<string, string>>;
