// Vue
import { ref, onMounted, onUnmounted } from 'vue';

// Types
import type { Ref } from 'vue';
import type { IDeviceIsOptions, DeviceIs } from '@/types/composables/device-is-types';

// Constants
import { breakpoints as bp } from '@/assets/ts/constants/breakpoints';

/**
 * Хук для определения текущего разрешения экрана по брейкпоинтам
 *
 * @param mount - флаг, указывающий, следует ли создавать медиа-запросы при монтировании компоненте
 * @param breakpoints - Брейкпоинты. По умолчанию bp из констант
 *
 * @returns - возвращает методы для управления состоянием компосабла и рефы:
 * state - акутальные статусы всех брейкпоинтов,
 * device - текущий активный брейкпонт
 */
export function useDeviceIs({ mount = true, breakpoints = bp }: IDeviceIsOptions): DeviceIs {
    const queries: Ref<Record<string, MediaQueryList>> = ref({});
    const state: Ref<Record<string, boolean>> = ref({});
    const device: Ref<string | null> = ref(null);
    const timeoutId: Ref<number | undefined> = ref(undefined);

    // Lifecycle hooks
    if (mount) {
        onMounted(initQueries);
        onUnmounted(clearQueries);
    }

    /**
     * Создает медиа-запросы для переданных брейкпоинтов.
     * Созданные медиа-запросы сохраняются в queries, а их состояние в state
     */
    function initQueries(): void {
        if (!window?.matchMedia) {
            return;
        }

        const createdQueries: Record<string, MediaQueryList> = {};
        const updatedState: Record<string, boolean> = {};
        const breakpointsKeys: string[] = Object.keys(bp).sort((a, b) => {
            return (bp?.[a] || 0) - (bp?.[b] || 0);
        });

        let currentDevice: string | null = null;

        for (let index = 0; index < breakpointsKeys.length; index++) {
            const breakpoint = breakpointsKeys[index];
            const nextBreakpoint = breakpointsKeys?.[index + 1] || null;

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
            const mediaQuery = queries.value[breakpoint];

            if (!mediaQuery.onchange) continue;

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
        currentBreakpoint: string | null,
        nextBreakpoint: string | null,
    ): MediaQueryList | null {
        const minWidth = currentBreakpoint ? breakpoints?.[currentBreakpoint] : NaN;
        const maxWidth = nextBreakpoint ? breakpoints?.[nextBreakpoint] : NaN;

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
            const isActive = Boolean(queries.value?.[breakpoint]?.matches);

            return { ...res, [breakpoint]: isActive };
        }, {});
    }

    /**
     * Обновляет state и device при изменении состояния медиа-запроса
     */
    function queryChangeListener(event: MediaQueryListEvent, breakpoint: string | null): void {
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
