// Types
import type {
    DeviceProperties,
    IDevicePropertiesOptions,
    DevicePropertiesBreakpointValues,
} from '@/types/composables/device-properties-types';
import type { DeviceIs } from '@/types/composables/device-is-types';

// Vue
import { inject, computed } from 'vue';

// Constants
import { breakpoints as bp } from '@/assets/ts/constants/breakpoints';

/**
 * Компосабл возвращающий computed свойство с значениями расчитаными на основе текущего размера экрана
 *
 * @param options - Объект, содержащий следующие свойства:
 * @param [options.properties={}] - Объект, где ключи - имена свойств, а значения - массивы значений,
 *                                  соответствующих устройствам из options.devices
 * @param [options.devices=['desktop', 'tablet', 'mobile']] - Массив имен устройств
 * @param [options.breakpoints=bp] - брейкпоинты, по-умолчанию bp из констант
 * @param [options.separator=' '] - разделитель для значений передаваемых в виде строки
 *
 * @returns Вычисляемый объект, содержащий текущие устройство-специфические свойства.
 *
 * @example
 * const properties = useDeviceProperties({
 *     properties: { size: ['56', '48', '32'] },
 *     devices: ['desktop', 'tablet','mobile'],
 * });
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
    devices = ['desktop', 'tablet', 'mobile'],
    breakpoints = bp,
    separator = ' ',
}: IDevicePropertiesOptions): DeviceProperties {
    const $deviceIs = inject<DeviceIs>('deviceIs');

    /**
     * Массив названий брейкпоинтов отсортированных по размеру
     */
    const allDevices = computed<string[]>(() => {
        return Object.keys(breakpoints).sort((a, b) => (bp?.[a] || 0) - (bp?.[b] || 0));
    });

    /**
     * Объект c значениями из properties привязанными к брейкпоинтам из devices
     *
     * @example { size: { desktop: '56', tablet: '48' } }
     */
    const breakpointValues = computed<DevicePropertiesBreakpointValues>(() => {
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
    function getBreakpointValues(values: string[] = []): Record<string, string> {
        const updatedDevices = prepareValues(devices);

        if (updatedDevices?.some(device => typeof device !== 'string')) return {};

        return updatedDevices.reduce((res, breakpoint, index) => {
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
    function getCurrentValue(breakpointValues: Record<string, string> = {}): string | null {
        const breakpointKeys: string[] = Object.keys(breakpointValues);

        if (breakpointKeys.length === 1 || !$deviceIs?.device?.value) {
            return breakpointValues?.[breakpointKeys[0]] || null;
        }

        const deviceIndex = allDevices.value.indexOf($deviceIs?.device?.value);

        if (deviceIndex === -1) return null;

        for (let index = deviceIndex; index < allDevices.value.length; index++) {
            const device = allDevices.value[index];
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
