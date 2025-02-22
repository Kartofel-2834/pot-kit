// Vue
import { ref } from 'vue';

// Types
import type { Ref } from 'vue';
import type { EPotDevice } from '@/enums/config';
import type {
    TDeviceIs,
    TDeviceIsMediaQueries,
    TDeviceIsState
} from '@/types/composables';

// Enums
import { POT_DEVICE, POT_BREAKPOINT } from '@/enums/config';



// В ключи enum-ов попадают и значения, у нас они числовые,
// поэтому мы можем легко их вычислить и отбросить
export const ALL_DEVICES = Object.values(POT_DEVICE); 

export const ALL_DEVICES_REVERSED = [...ALL_DEVICES].reverse();

/**
 * Хук для определения текущего разрешения экрана по брейкпоинтам
 *
 * @param mount - флаг, указывающий, следует ли создавать медиа-запросы при монтировании компоненте
 *
 * @returns - возвращает методы для управления состоянием компосабла и рефы:
 * state - акутальные статусы всех брейкпоинтов,
 * device - текущий активный брейкпонт
 */
export function useDeviceIs(): TDeviceIs {
    const queries: Ref<TDeviceIsMediaQueries> = ref({});
    const state: Ref<TDeviceIsState> = ref({});
    const device: Ref<EPotDevice | null> = ref(null);
    const timeoutId: Ref<number | undefined> = ref(undefined);

    /**
     * Создает медиа-запросы для переданных брейкпоинтов.
     * Созданные медиа-запросы сохраняются в queries, а их состояние в state
     */
    function initQueries(): void {
        if (!window?.matchMedia) {
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

        queries.value = createdQueries;
        state.value = updatedState;
        device.value = currentDevice;
    }

    /**
     * Очистка созданных медиа-запросов и удаление их обработчиков событий
     */
    function clearQueries(): void {
        clearTimeout(timeoutId.value);

        for (const breakpoint in queries.value) {
            const mediaQuery = queries.value[breakpoint as EPotDevice];

            if (!mediaQuery?.onchange) continue;

            mediaQuery.removeEventListener('change', mediaQuery.onchange);
        }

        queries.value = {};
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

    /**
     * Обновляет state используя акутальные данные медиа-запросов
     */
    function updateState(): void {
        state.value = Object.keys(queries.value).reduce((res, breakpoint) => {
            const isActive = Boolean(queries.value?.[breakpoint as EPotDevice]?.matches);

            return { ...res, [breakpoint]: isActive };
        }, {});
    }

    /**
     * Обновляет state и device при изменении состояния медиа-запроса
     */
    function queryChangeListener(
        event: MediaQueryListEvent,
        breakpoint: EPotDevice | null
    ): void {
        clearTimeout(timeoutId.value);
        timeoutId.value = setTimeout(updateState);

        if (!event?.matches) {
            return;
        }

        device.value = breakpoint;
    }

    return {
        state,
        device,
        init: initQueries,
        clear: clearQueries,
        update: updateState,
    };
}
