// Types
import type { Ref } from 'vue';

// Enums
import { EDevice } from '@/enums/config';

export type DeviceIsMediaQueries = Partial<Record<EDevice, MediaQueryList>>

export type DeviceIsState = Partial<Record<EDevice, boolean>>

export type DeviceIs = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<DeviceIsState>;

    /** Текущий активный брейкпонт */
    device: Ref<EDevice | null>;

    /** Создает медиа-запросы для переданных брейкпоинтов */
    init: () => void;

    /** Очищает созданные медиа-запросы и удаляет их обработчики событий */
    clear: () => void;

    /** Обновляет state используя акутальные данные медиа-запросов */
    update: () => void;
};

