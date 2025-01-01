// Types
import type { Ref } from 'vue';

// Enums
import { EDevices } from '@/enums/config';

export type DeviceIsMediaQueries = Partial<Record<EDevices, MediaQueryList>>

export type DeviceIsState = Partial<Record<EDevices, boolean>>

export type DeviceIs = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<DeviceIsState>;

    /** Текущий активный брейкпонт */
    device: Ref<EDevices | null>;

    /** Создает медиа-запросы для переданных брейкпоинтов */
    init: () => void;

    /** Очищает созданные медиа-запросы и удаляет их обработчики событий */
    clear: () => void;

    /** Обновляет state используя акутальные данные медиа-запросов */
    update: () => void;
};

