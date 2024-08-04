// Vue
import { inject, computed } from 'vue';

// Constants
import { bp } from '@/assets/js/constants/breakpoints';

export function useDeviceProperties({
    properties = {},
    devices = ['desktop', 'tablet', 'mobile'],
    breakpoints = bp,
}) {
    const $deviceIs = inject('deviceIs');

    // Computed
    const allDevices = computed(() => {
        return Object.keys(breakpoints).sort((a, b) => bp[a] - bp[b]);
    });

    const breakpointSizes = computed(() => {
        return Object.keys(properties).reduce((res, property) => {
            const sizes = properties[property];
            return !Array.isArray(sizes) ? res : { ...res, [property]: getBreakpointValues(sizes) };
        }, {});
    });

    const currentProperties = computed(() => {
        return Object.keys(breakpointSizes.value).reduce((res, property) => {
            return {
                ...res,
                [property]: getCurrentValue(breakpointSizes.value[property]),
            };
        }, {});
    });

    // Methods
    function getBreakpointValues(values = []) {
        return devices.reduce((res, breakpoint, index) => {
            const value = values?.[index];

            return value && value !== '_' ? { ...res, [breakpoint]: value } : res;
        }, {});
    }

    function getCurrentValue(breakpointValues) {
        const deviceIndex = allDevices.value.indexOf($deviceIs?.device?.value);

        if (deviceIndex === -1) {
            return null;
        }

        for (let index = deviceIndex; index < allDevices.value.length; index++) {
            const device = allDevices.value[index];
            const value = breakpointValues?.[device];

            if (value) {
                return value;
            }
        }

        return null;
    }

    return currentProperties;
}
