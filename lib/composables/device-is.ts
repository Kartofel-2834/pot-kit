// Types
import type { TDeviceIs } from "@/types/pot-kit/composables/device-is";
import type { EUiDevice } from "@/types/pot-kit";

// Constants
import { ALL_DEVICES, UI_BREAKPOINT } from "@/types/pot-kit";

// Vue
import { computed, ref } from "vue";

type TDevice = EUiDevice;

const emptyState: Record<TDevice, boolean> = Object.keys(UI_BREAKPOINT).reduce((res, breakpoint) => {
    return { ...res, [breakpoint]: false };
}, {} as Record<TDevice, boolean>); 

let queries: Map<TDevice, MediaQueryList> | null = null;

const device = ref<TDevice | null>(null);

const state = computed(() => {
    const data = { ...emptyState };

    if (device.value && ALL_DEVICES.includes(device.value)) { 
        data[device.value] = true;
    }

    return data; 
});

function queryChangeListener(
    event: MediaQueryListEvent,
    breakpoint: TDevice | null
) {
    if (!event || !event.matches) return;

    device.value = breakpoint;
}

function createQuery(
    currentBreakpoint: TDevice | null,
    nextBreakpoint: TDevice | null,
): MediaQueryList | null {
    const minWidth = currentBreakpoint ? UI_BREAKPOINT[currentBreakpoint] : NaN;
    const maxWidth = nextBreakpoint ? UI_BREAKPOINT[nextBreakpoint] : NaN;

    const minWidthQuery = isNaN(minWidth) ? '' : `(min-width: ${minWidth}px)`;
    const maxWidthQuery = isNaN(maxWidth) ? '' : `(max-width: ${maxWidth - 0.02}px)`;

    const query: string = [minWidthQuery, maxWidthQuery].filter(Boolean).join(' and ');

    if (!query.length) {
        return null;
    }

    const createdQuery: MediaQueryList = window.matchMedia(query);

    createdQuery.onchange = (event: MediaQueryListEvent) => {
        queryChangeListener(event, currentBreakpoint);
    };

    return createdQuery;
}

function clearQueries() {
    if (!queries) return;

    queries.forEach((value) => {
        if (!value.onchange) return;

        value.removeEventListener('change', value.onchange);
    });

    queries = null;
}

function initQueries() {
    if (!window?.matchMedia) {
        console.warn('[deviceIs/initQueries]: media query setup failed. widnow matchMedia not found');
        return;
    }

    clearQueries();

    const createdQueries = new Map<TDevice, MediaQueryList>();
    let currentDevice: TDevice | null = null;

    for (let index = 0; index < ALL_DEVICES.length; index++) {
        const breakpoint = ALL_DEVICES[index];
        const nextBreakpoint = ALL_DEVICES[index + 1] || null;

        const mediaQuery = createQuery(breakpoint, nextBreakpoint);

        if (!mediaQuery) continue;


        createdQueries.set(breakpoint, mediaQuery);
        currentDevice = !currentDevice && mediaQuery.matches ? breakpoint : currentDevice;
    }

    queries = createdQueries;
    device.value = currentDevice;
}

export function useDeviceIs(): TDeviceIs<TDevice> { 
    if (queries === null) {
        setTimeout(() => {
            if (queries) return;
            
            initQueries();
        });
    }
        
    return { state, device };
}