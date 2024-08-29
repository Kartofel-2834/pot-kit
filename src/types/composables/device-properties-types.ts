// Types
import type { ComputedRef } from 'vue';

/**
 * Интерфейс options компосабла useDeviceProperties
 */
export interface IDevicePropertiesOptions {
    /**
     * Объект, где ключи - имена свойств, а значения - массивы значений,
     * соответствующих устройствам из options.devices
     */
    properties?: Record<string, string | string[]>;

    /**
     * Массив имен устройств
     */
    devices?: string | string[];

    /**
     * Брейкпоинты для адаптивного дизайна
     */
    breakpoints?: Record<string, number>;

    /**
     * Разделитель для значений передаваемых в виде строки
     */
    separator?: string;
}

export type DeviceProperties = ComputedRef<Record<string, string | null>>;

export type DevicePropertiesBreakpointValues = Record<string, Record<string, string>>;
