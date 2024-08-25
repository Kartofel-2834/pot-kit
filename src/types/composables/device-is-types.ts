// Types
import type { Ref } from 'vue';

/**
 * Интерфейс options для useDeviceIs
 *
 * @param {boolean} mount - флаг, указывающий, следует ли создавать медиа-запросы при монтировании компоненте
 * @param {Record<string, number>} breakpoints - Брейкпоинты. По умолчанию bp из констант
 */
export interface IDeviceIsOptions {
    mount: boolean;
    breakpoints: Record<string, number>;
}

export type DeviceIs = {
    /**
     * Акутальные статусы всех брейкпоинтов
     */
    state: Ref<Record<string, boolean>>;

    /**
     * Текущий активный брейкпонт
     */
    device: Ref<string | null>;

    /**
     * Создает медиа-запросы для переданных брейкпоинтов
     */
    init: () => void;

    /**
     * Очищает созданные медиа-запросы и удаляет их обработчики событий
     */
    clear: () => void;

    /**
     * Обновляет state используя акутальные данные медиа-запросов
     */
    update: () => void;
};

export interface IDeviceIsPluginOptions {
    breakpoints?: Record<string, number>;
}
