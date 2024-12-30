// Types
import type { Ref } from 'vue';

// Enums
import { EBreakpoints } from '@/enums/config';

export type DeviceBreakpoint = keyof typeof EBreakpoints;

export type DeviceIsMediaQueries = Partial<Record<DeviceBreakpoint, MediaQueryList>>

export type DeviceIsState = Partial<Record<DeviceBreakpoint, boolean>>

export type DeviceIs = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<DeviceIsState>;

    /** Текущий активный брейкпонт */
    device: Ref<DeviceBreakpoint | null>;

    /** Создает медиа-запросы для переданных брейкпоинтов */
    init: () => void;

    /** Очищает созданные медиа-запросы и удаляет их обработчики событий */
    clear: () => void;

    /** Обновляет state используя акутальные данные медиа-запросов */
    update: () => void;
};

