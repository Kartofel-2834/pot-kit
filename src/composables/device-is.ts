// Vue
import { ref, onMounted, onUnmounted } from 'vue';

// Types
import type { Ref } from 'vue';
import type {
    DeviceBreakpoint,
    DeviceIs,
    DeviceIsMediaQueries,
    DeviceIsState
} from '@/types/composables';

// Enums
import { EBreakpoints } from '@/enums/config';

// В ключи enum-ов попадают и значения, у нас они числовые,
// поэтому мы можем легко их вычислить и отбросить
export const ALL_DEVICES = Object.keys(EBreakpoints).filter(key => !/^[0-9]+$/.test(key)) as DeviceBreakpoint[];

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
export function useDeviceIs(mount: boolean = true): DeviceIs {
    const queries: Ref<DeviceIsMediaQueries> = ref({});
    const state: Ref<DeviceIsState> = ref({});
    const device: Ref<DeviceBreakpoint | null> = ref(null);
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

        const createdQueries: Partial<DeviceIsMediaQueries> = {};
        const updatedState: Partial<DeviceIsState> = {};

        // const breakpointsKeys: string[] = Object.keys(breakpoints).sort((a, b) => {
        //     return (breakpoints?.[a] || 0) - (breakpoints?.[b] || 0);
        // });

        let currentDevice: DeviceBreakpoint | null = null;

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
            const mediaQuery = queries.value[breakpoint as DeviceBreakpoint];

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
        currentBreakpoint: DeviceBreakpoint | null,
        nextBreakpoint: DeviceBreakpoint | null,
    ): MediaQueryList | null {
        const minWidth = currentBreakpoint ? EBreakpoints?.[currentBreakpoint] : NaN;
        const maxWidth = nextBreakpoint ? EBreakpoints?.[nextBreakpoint] : NaN;

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
            const isActive = Boolean(queries.value?.[breakpoint as DeviceBreakpoint]?.matches);

            return { ...res, [breakpoint]: isActive };
        }, {});
    }

    /**
     * Обновляет state и device при изменении состояния медиа-запроса
     */
    function queryChangeListener(
        event: MediaQueryListEvent,
        breakpoint: DeviceBreakpoint | null
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
