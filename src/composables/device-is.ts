// Vue
import { ref } from 'vue';

// Types
import type { EPotDevice } from '@/enums/preset';
import type {
    TDeviceIs,
    TDeviceIsMediaQueries,
    TDeviceIsState
} from '@/types/composables';

// Enums
import { POT_DEVICE, POT_BREAKPOINT } from '@/enums/preset';

export const ALL_DEVICES = Object.values(POT_DEVICE); 

export const ALL_DEVICES_REVERSED = [...ALL_DEVICES].reverse();

const state = ref<TDeviceIsState>({});
const device = ref<EPotDevice | null>(null);

let isInited = false;
let timeoutId: number = NaN;
let queries: TDeviceIsMediaQueries = {};

/** Очистка созданных медиа-запросов и удаление их обработчиков событий */
function clearQueries() {
    clearTimeout(timeoutId);

    for (const breakpoint in queries) {
        const mediaQuery = queries[breakpoint as EPotDevice];

        if (!mediaQuery?.onchange) continue;

        mediaQuery.removeEventListener('change', mediaQuery.onchange);
    }

    queries = {};
}

/**
 * Создает медиа-запрос
 *
 * @param currentBreakpoint - имя брейкпоинта
 * @param nextBreakpoint - имя следующего брейкпоинта (для ограничения по max-width)
 */
function createQuery(
    currentBreakpoint: EPotDevice | null,
    nextBreakpoint: EPotDevice | null,
): MediaQueryList | null {
    const minWidth = currentBreakpoint ? POT_BREAKPOINT?.[currentBreakpoint] : NaN;
    const maxWidth = nextBreakpoint ? POT_BREAKPOINT?.[nextBreakpoint] : NaN;

    const minWidthQuery = isNaN(minWidth) ? '' : `(min-width: ${minWidth}px)`;
    const maxWidthQuery = isNaN(maxWidth) ? '' : `(max-width: ${maxWidth - 0.02}px)`;

    const query: string = [minWidthQuery, maxWidthQuery].filter(Boolean).join(' and ');

    if (!query?.length) {
        return null;
    }

    const createdQuery: MediaQueryList = window.matchMedia(query);

    createdQuery.onchange = (event: MediaQueryListEvent): void => {
        queryChangeListener(event, currentBreakpoint);
    };

    return createdQuery;
}

/** Обновляет state используя акутальные данные медиа-запросов */
function updateState(): void {
    state.value = Object.keys(queries).reduce((res, breakpoint) => {
        const isActive = Boolean(queries?.[breakpoint as EPotDevice]?.matches);

        return { ...res, [breakpoint]: isActive };
    }, {});
}

/** Обновляет state и device при изменении состояния медиа-запроса */
function queryChangeListener(
    event: MediaQueryListEvent,
    breakpoint: EPotDevice | null
): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(updateState);

    if (!event?.matches) {
        return;
    }

    device.value = breakpoint;
}

/**
 * Создает медиа-запросы для переданных брейкпоинтов.
 * Созданные медиа-запросы сохраняются в queries, а их состояние в state
*/
export function initQueries(): void {
    if (!window?.matchMedia) {
        console.warn('[deviceIs/initQueries]: media query setup failed. widnow matchMedia not found');
        return;
    }

    clearQueries();

    const createdQueries: Partial<TDeviceIsMediaQueries> = {};
    const updatedState: Partial<TDeviceIsState> = {};

    let currentDevice: EPotDevice | null = null;

    for (let index = 0; index < ALL_DEVICES.length; index++) {
        const breakpoint = ALL_DEVICES[index];
        const nextBreakpoint = ALL_DEVICES?.[index + 1] || null;

        const mediaQuery = createQuery(breakpoint, nextBreakpoint);

        if (!mediaQuery) {
            updatedState[breakpoint] = false;
            continue;
        }

        createdQueries[breakpoint] = mediaQuery;
        updatedState[breakpoint] = Boolean(mediaQuery.matches);
        currentDevice = !currentDevice && mediaQuery.matches ? breakpoint : currentDevice;
    }

    queries = createdQueries;
    state.value = updatedState;
    device.value = currentDevice;
}

export function useDeviceIs(): TDeviceIs {
    if (isInited) {
        return { state, device };
    }
    
    setTimeout(() => {
        if (!isInited) {
            isInited = true;
            initQueries();
        }
    });

    return { state, device };
}