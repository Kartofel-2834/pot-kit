// Vue
import { inject, computed } from 'vue';

// Constants
import { bp } from '@/assets/js/constants/breakpoints';

/**
 * Компосабл возвращающий computed свойство с значениями расчитаными на основе текущего размера экрана
 *
 * @param {Object} options - Объект, содержащий следующие свойства:
 * @param {Object} [options.properties={}] - Объект, где ключи - имена свойств, а значения - массивы значений,
 *                                           соответствующих устройствам из options.devices
 * @param {Array} [options.devices=['desktop', 'tablet', 'mobile']] - Массив имен устройств
 * @param {Object} [options.breakpoints=bp] - брейкпоинты, по-умолчанию bp из констант
 *
 * @returns {Object} - Вычисляемый объект, содержащий текущие устройство-специфические свойства.
 *
 * @example useDeviceProperties({
 *     properties: { size: ['56', '48', '32'] },
 *     devices: ['desktop', 'tablet','mobile'],
 * });
 */
export function useDeviceProperties({
    properties = {},
    devices = ['desktop', 'tablet', 'mobile'],
    breakpoints = bp,
    separator = ' ',
}) {
    const $deviceIs = inject('deviceIs');

    /**
     * Массив названий брейкпоинтов отсортированных по размеру
     *
     * @param {Object} breakpoints - брейкпоинты, по-умолчнию bp из констант
     *
     * @returns {Array} - Отсортированный массив брейкпоинтов устройств
     */
    const allDevices = computed(() => {
        return Object.keys(breakpoints).sort((a, b) => (bp?.[a] || 0) - (bp?.[b] || 0));
    });

    /**
     * Создает объект, содержащий значения для каждого свойства, зависящие от брейкпоинтов
     *
     * @returns {Object} - Объект c значениями из properties привязанными к брейкпоинтам из devices
     *
     * @example { size: { desktop: '56', tablet: '48' } }
     */
    const breakpointValues = computed(() => {
        if (!properties || typeof properties !== 'object') return {};

        return Object.entries(properties).reduce((res, [property, values]) => {
            const updatedValues = prepareValues(values);

            if (!updatedValues?.length) return res;

            return { ...res, [property]: getBreakpointValues(updatedValues) };
        }, {});
    });

    /**
     * Возвращает объект с текущими устройство-специфическими свойствами.
     *
     * @returns {Object} - Объект с текущими устройство-специфическими свойствами.
     */
    const currentProperties = computed(() => {
        return Object.entries(breakpointValues.value).reduce((res, [property, values]) => {
            return {
                ...res,
                [property]: getCurrentValue(values),
            };
        }, {});
    });

    /**
     * Возвращает объект, в котором ключи - имена брейкпоинтов из devices, а значения берутся из properties
     *
     * @param {Array} values - массив значений, каждое значение соответствует устройству из devices
     *
     * @returns {Object} Объект, содержащий имена брейкпоинтов в качестве ключей и соответствующие им значения.
     * Если для брейкпоинтов передан только один размер, то возвращается объект с одним ключом и значением.
     * Если для какого-либо устройства не указано значение или указано '_', то это устройство игнорируется.
     */
    function getBreakpointValues(values = []) {
        const updatedDevices = prepareValues(devices);

        if (updatedDevices?.some(device => typeof device !== 'string')) return [];

        return updatedDevices.reduce((res, breakpoint, index) => {
            const value = values?.[index];

            return value && value !== '_' ? { ...res, [breakpoint]: value } : res;
        }, {});
    }

    /**
     * Выбирает значение на основе текущего устройства.
     *
     * @param {Object} breakpointValues - Объект, содержащий имена брейкпоинтов в качестве ключей и соответствующие им значения
     *
     * @returns {any} Выбранное из properties значение или null, если значение не найдено
     */
    function getCurrentValue(breakpointValues = {}) {
        const breakpointKeys = Object.keys(breakpointValues);

        // Если для брейкпоинтов передан только один размер, то выбираем его
        if (breakpointKeys.length === 1 || !$deviceIs?.device?.value) {
            return breakpointValues?.[breakpointKeys[0]] || null;
        }

        const deviceIndex = allDevices.value.indexOf($deviceIs?.device?.value);

        if (deviceIndex === -1) return null;

        // Находим ближайший сверху к текущему девайсу брейкпоинт
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
     * @param {string} notFormattedValues - Строка для разбиения и фильтрации.
     *
     * @returns {string[]} - Массив значений после разбиения и фильтрации.
     */
    function prepareValues(notFormattedValues) {
        if (Array.isArray(notFormattedValues)) {
            return notFormattedValues.filter(Boolean);
        }

        const formattedValues = notFormattedValues?.split(separator) || [];
        return formattedValues.filter(Boolean);
    }

    return currentProperties;
}

/**
 * Валидатор для пропа передаваемого в useDeviceProperties
 *
 * @param {Array|String} [choices=[]] - Допустимые значения
 * @param {String} [separator=' '] - Разделитель значений, если в проп передана строка вместо массива
 *
 * @returns {Function}
 */
export function getDevicePropertyValidator(choices = [], separator = ' ') {
    return value => {
        if (!Array.isArray(value) && typeof value !== 'string') return false;

        let formattedValue = Array.isArray(value) ? value : value?.split(separator);
        formattedValue = formattedValue.filter(value => value && value !== '_');

        return !formattedValue?.find(breakpoint => !choices?.includes(breakpoint));
    };
}
