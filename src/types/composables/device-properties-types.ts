// Types
import type { breakpoints } from '@/assets/ts/constants/breakpoints';
import type { ComputedRef } from 'vue';

/**
 * Интерфейс options компосабла useDeviceProperties
 *
 * @param [properties={}] - Объект, где ключи - имена свойств, а значения - массивы значений,
 *                          соответствующих устройствам из options.devices
 * @param [devices=['desktop', 'tablet', 'mobile']] - Массив имен устройств
 * @param [breakpoints=bp] - брейкпоинты, по-умолчанию bp из констант
 * @param [separator=' '] - разделитель для значений передаваемых в виде строки
 *
 * @returns - возвращает методы для управления состоянием компосабла и рефы:
 * state - акутальные статусы всех брейкпоинтов,
 * device - текущий активный брейкпонт
 */
export interface IDevicePropertiesOptions {
    properties?: Record<string, string | string[]>;
    devices?: string | string[];
    breakpoints?: Record<string, number>;
    separator?: string;
}

export type DeviceProperties = ComputedRef<Record<string, string | null>>;

export type DevicePropertiesBreakpointValues = Record<string, Record<string, string>>;