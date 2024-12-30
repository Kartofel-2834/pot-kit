// Types
import type { ComputedRef } from 'vue';
import type { DeviceBreakpoint } from './device-is-types';

/**
 * Интерфейс options компосабла useDeviceProperties
 */
export interface IDevicePropertiesOptions {
    /**
     * Объект, где ключи - имена свойств, а значения - массивы значений,
     * соответствующих устройствам из options.devices
     */
    properties?: Record<string, string | string[]>;

    /** Массив имен устройств */
    devices?: DeviceBreakpoint[];

    /** Разделитель для значений передаваемых в виде строки */
    separator?: string;
}

export type DeviceProperties = ComputedRef<Record<string, string | null>>;

export type DevicePropertiesBreakpointValues = Partial<Record<DeviceBreakpoint, string>>;
