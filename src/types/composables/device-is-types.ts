// Types
import type { Ref } from 'vue';
import type { EPotDevice } from '@/enums/config';

export type TDeviceIsMediaQueries = Partial<Record<EPotDevice, MediaQueryList>>

export type TDeviceIsState = Partial<Record<EPotDevice, boolean>>

export type TDeviceIs = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<TDeviceIsState>;

    /** Текущий активный брейкпонт */
    device: Ref<EPotDevice | null>;

    /** Создает медиа-запросы для переданных брейкпоинтов */
    init: () => void;

    /** Очищает созданные медиа-запросы и удаляет их обработчики событий */
    clear: () => void;

    /** Обновляет state используя акутальные данные медиа-запросов */
    update: () => void;
};

