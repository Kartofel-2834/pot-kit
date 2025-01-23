// Types
import type { Ref } from 'vue';

// Enums
import { EDevice } from '@/enums/config';

export type TDeviceIsMediaQueries = Partial<Record<EDevice, MediaQueryList>>

export type TDeviceIsState = Partial<Record<EDevice, boolean>>

export type TDeviceIs = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<TDeviceIsState>;

    /** Текущий активный брейкпонт */
    device: Ref<EDevice | null>;

    /** Создает медиа-запросы для переданных брейкпоинтов */
    init: () => void;

    /** Очищает созданные медиа-запросы и удаляет их обработчики событий */
    clear: () => void;

    /** Обновляет state используя акутальные данные медиа-запросов */
    update: () => void;
};

