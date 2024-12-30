// Types
import type {
    DeviceIs,
    DeviceProperties,
    DevicePropertiesBreakpointValues,
    DeviceBreakpoint,
    IDevicePropertiesOptions
} from '@/types/composables';

// Vue
import { inject, computed } from 'vue';

// Constants
import { ALL_DEVICES } from './device-is';

// В ключи enum-ов попадают и значения, у нас они числовые,
// поэтому мы можем легко их вычислить и отбросить
// const allDevices = Object.keys(EBreakpoints).filter(key => !/^[0-9]+$/.test(key)) as DeviceBreakpoint[];
// console.log('allDevices', allDevices);

/**
 * Компосабл возвращающий computed свойство с значениями расчитаными на основе текущего размера экрана
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
 *  [EBreakpoints.DESKTOP, EBreakpoints.TABLET, EBreakpoints.MOBILE]
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
export function useDeviceProperties({
    properties = {},
    devices = ALL_DEVICES,
    separator = ' '
}: IDevicePropertiesOptions): DeviceProperties {
    const $deviceIs = inject<DeviceIs>('deviceIs');

    /**
     * Объект c значениями из properties привязанными к брейкпоинтам из devices
     *
     * @example { size: { desktop: '56', tablet: '48' } }
     */
    const breakpointValues = computed<Record<string, DevicePropertiesBreakpointValues>>(() => {
        if (!properties || typeof properties !== 'object') return {};

        return Object.entries(properties).reduce((res, [property, values]) => {
            const updatedValues = prepareValues(values);

            if (!updatedValues?.length) return res;

            return { ...res, [property]: getBreakpointValues(updatedValues) };
        }, {});
    });

    /**
     * Объект с текущими устройство-специфическими свойствами.
     */
    const currentProperties: DeviceProperties = computed(() => {
        return Object.entries(breakpointValues.value).reduce((res, [property, values]) => {
            return {
                ...res,
                [property]: getCurrentValue(values),
            };
        }, {});
    });

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
    function getBreakpointValues(values: string[] = []): DevicePropertiesBreakpointValues {
        if (devices.some(device => typeof device !== 'string')) return {};

        return devices.reduce((res, breakpoint, index) => {
            const value = values?.[index];

            return value && value !== '_' ? { ...res, [breakpoint]: value } : res;
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
    function getCurrentValue(breakpointValues: DevicePropertiesBreakpointValues = {}): string | null {
        const breakpointKeys = Object.keys(breakpointValues) as DeviceBreakpoint[];

        if (breakpointKeys.length === 1 || !$deviceIs?.device?.value) {
            return breakpointValues?.[breakpointKeys[0]] || null;
        }

        const deviceIndex = ALL_DEVICES.indexOf($deviceIs?.device?.value as DeviceBreakpoint);

        if (deviceIndex === -1) return null;

        for (let index = deviceIndex; index < ALL_DEVICES.length; index++) {
            const device = ALL_DEVICES[index];
            const value = breakpointValues?.[device];

            if (value) return value;
        }

        return null;
    }

    /**
     * Подготавливает массив значений, разбивая строку на основе
     * заданного разделителя и фильтруя пустые значения
     *
     * @param notFormattedValues - Строка для разбиения и фильтрации.
     *
     * @returns - Массив значений после разбиения и фильтрации.
     */
    function prepareValues(notFormattedValues: string | string[]): string[] {
        if (Array.isArray(notFormattedValues)) {
            return notFormattedValues.filter(Boolean);
        }

        const formattedValues = notFormattedValues?.split(separator) || [];

        return formattedValues.filter(Boolean);
    }

    return currentProperties;
}
