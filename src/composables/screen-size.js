// Vue
import { ref, onMounted, onUnmounted } from 'vue';

// Constants
import { breakpoints } from '@/assets/js/constants/breakpoints';

/**
 * Хук для определения текущего разрешения экрана по брейкпоинтам
 *
 * @param {Object} bp - Брейкпоинты. По умолчанию использует объект breakpoints, если не указан
 *
 * @returns {Object} - возвращает рефы:
 *                     state - акутальные статусы всех брейкпоинтов
 *                     device - текущий активный брейкпонт
 */
export function useScreenSize(bp = breakpoints) {
    const queries = ref({});
    const state = ref({});
    const device = ref(null);
    const timeoutId = ref(null);

    // Lifecycle hooks
    onMounted(() => {
        initQueries();
    });

    onUnmounted(() => {
        clearTimeout(timeoutId.value);
        clearQueries();
    });

    /**
     * Создает медиа-запросы для переданных брейкпоинтов
     * Созданные медиа-запросы сохраняются в queries, а их состояние в state
     *
     * @returns {void}
     */
    function initQueries() {
        if (!window?.matchMedia) {
            return;
        }

        const breakpointsKeys = Object.keys(bp);
        const createdQueries = {};
        const updatedState = {};

        let currentDevice = null;

        for (let index = 0; index < breakpointsKeys.length; index++) {
            const breakpoint = breakpointsKeys[index];
            const nextBreakpoint = breakpointsKeys?.[index + 1];

            const mediaQuery = createQuery(breakpoint, nextBreakpoint);

            if (!mediaQuery) {
                updatedState[breakpoint] = false;
                continue;
            }

            createdQueries[breakpoint] = mediaQuery;
            updatedState[breakpoint] = mediaQuery.matches;
            currentDevice = !currentDevice && mediaQuery.matches ? breakpoint : currentDevice;
        }

        queries.value = createdQueries;
        state.value = updatedState;
        device.value = currentDevice;
    }

    /**
     * Очистка созданных медиа-запросов и удаление их обработчиков событий
     *
     * @returns {void}
     */
    function clearQueries() {
        for (const breakpoint in queries.value) {
            const mediaQuery = queries.value[breakpoint];
            mediaQuery.removeEventListener('change', queryChangeListener);
        }

        queries.value = {};
    }

    /**
     * Создает медиа-запрос
     *
     * @param {string} currentBreakpoint - имя брейкпоинта
     * @param {string} nextBreakpoint - имя следующего брейкпоинта (для ограничения по max-width)
     *
     * @returns {MediaQueryList|null}
     */
    function createQuery(currentBreakpoint, nextBreakpoint) {
        let minWidth = bp[currentBreakpoint];
        let maxWidth = bp?.[nextBreakpoint];

        minWidth = isNaN(minWidth) ? '' : `(min-width: ${minWidth}px)`;
        maxWidth = isNaN(maxWidth) ? '' : `(max-width: ${maxWidth - 0.02}px)`;

        const query = [minWidth, maxWidth].filter(Boolean).join(' and ');

        if (!query?.length) {
            return null;
        }

        const createdQuery = window.matchMedia(query);

        createdQuery.addEventListener('change', event => {
            queryChangeListener(event, currentBreakpoint);
        });

        return createdQuery;
    }

    /**
     * Обновляет state используя акутальные данные медиа-запросов
     *
     * @returns {void}
     */
    function updateState() {
        state.value = Object.keys(queries.value).reduce((res, breakpoint) => {
            const isActive = Boolean(queries.value?.[breakpoint]?.matches);

            return { ...res, [breakpoint]: isActive };
        }, {});
    }

    /**
     * Обновляет state и device при изменении состояния медиа-запроса
     *
     * @param {string} breakpoint - Имя брейкпоинта, состояние которого изменилось
     *
     * @returns {void}
     */
    function queryChangeListener(event, breakpoint) {
        clearTimeout(timeoutId.value);
        timeoutId.value = setTimeout(updateState);

        if (!event?.matches) {
            return;
        }

        device.value = breakpoint;
    }

    return { state, device };
}
