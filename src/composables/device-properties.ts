// Types
import type {
    TDeviceProperties,
    TDevicePropertiesBreakpointsValues,
    TDevicePropertyValue,
} from '@/types/composables';
import type { EPotDevice } from '@/enums/config';

// Constants
import { ALL_DEVICES_REVERSED } from './device-is';

/**
 * Компосабл возвращающий значения расчитанные на основе текущего размера экрана
 *
 * @param properties - Объект, где ключи - имена свойств, а значения - массивы значений,
 *                     соответствующих устройствам из options.devices
 * @param devices - Массив имен устройств
 *
 * @returns Вычисляемый объект, содержащий текущие устройство-специфические свойства.
 *
 * @example
 * const properties = useDeviceProperties(
 *  {
 *     size: ['56', '48', '32']
 *  },
 *  [EDevice.DESKTOP, EDevice.TABLET, EDevice.MOBILE]
 * );
 *
 * // Для десктопа
 * properties.value //  { size: '56' }
 *
 * // Для планшета
 * properties.value //  { size: '48' }
 *
 * // Для телефона
 * properties.value //  { size: '32' }
 */
export function useDeviceProperties<T>(
    properties: T,
    devices: EPotDevice[] = ALL_DEVICES_REVERSED,
    currentDevice?: EPotDevice | null,
): TDeviceProperties<T> {
    const breakpointValues = getAllBreakpointsValues();

    /**
     * Возвращает объект c значениями из properties привязанными к брейкпоинтам из devices
     *
     * @example { size: { desktop: ESize.MEDIUM, tablet: ESize.SMALL } }
     */
    function getAllBreakpointsValues(): TDevicePropertiesBreakpointsValues<T> {
        if (!properties || typeof properties !== 'object') return {};

        return Object.entries(properties).reduce((res, data) => {
            const property = data[0] as keyof T;
            const values = data[1] as T[typeof property];

            const updatedValues = prepareValues(values);

            if (!updatedValues?.length) return res;

            return { ...res, [property]: getBreakpointValues(updatedValues) };
        }, {});
    }

    /**
     * Возвращает объект, в котором ключи - имена брейкпоинтов из devices,
     * а значения берутся из properties
     *
     * @param values - массив значений, каждое значение соответствует устройству из devices
     *
     * @returns Объект, содержащий имена брейкпоинтов в качестве ключей и соответствующие им значения.
     * Если для брейкпоинтов передан только один размер, то возвращается объект
     * с одним ключом и значением.
     * Если для какого-либо устройства не указано значение или указано '_',
     * то это устройство игнорируется.
     */
    function getBreakpointValues(
        values: Array<T[keyof T]> = []
    ): TDevicePropertiesBreakpointsValues<T>[keyof T] {
        if (devices.some(device => typeof device !== 'string')) return {};

        return devices.reduce((res, breakpoint, index) => {
            const value = values?.[index];

            if (value === null || value === undefined) {
                return res;
            }

            return { ...res, [breakpoint]: value };
        }, {});
    }

    /**
     * Выбирает значение на основе текущего устройства.
     *
     * @param breakpointValues - Объект, содержащий имена брейкпоинтов в
     * качестве ключей и соответствующие им значения
     *
     * @returns Выбранное из properties значение или null, если значение не найдено
     */
    function getCurrentValue(
        breakpointValues: TDevicePropertiesBreakpointsValues<T>[keyof T] = {}
    ): TDevicePropertyValue<T[keyof T]> | null {
        const breakpointKeys = Object.keys(breakpointValues) as EPotDevice[];

        if (breakpointKeys.length === 1 || !currentDevice) {
            return breakpointValues?.[breakpointKeys[0]] || null;
        }

        const deviceIndex = ALL_DEVICES_REVERSED.indexOf(currentDevice);

        if (deviceIndex === -1) return null;

        for (let index = deviceIndex; index >= 0; index--) {
            const device = ALL_DEVICES_REVERSED[index];
            const value = breakpointValues?.[device];

            if (value) return value;
        }

        return null;
    }

    /**  Подготавливает массив значений */
    function prepareValues(notFormattedValues: T[keyof T]): Array<T[keyof T]> {
        return (Array.isArray(notFormattedValues) ? notFormattedValues : [notFormattedValues]);
    }

    /**
     * Объект с текущими устройство-специфическими свойствами.
     */
    return Object.entries(breakpointValues).reduce((res, data) => {
        const property = data[0] as keyof T;
        const values = data[1] as TDevicePropertiesBreakpointsValues<T>[typeof property];

        return {
            ...res,
            [property]: getCurrentValue(values),
        };
    }, {});
}
