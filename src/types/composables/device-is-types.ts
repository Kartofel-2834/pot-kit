// Types
import type { Ref } from 'vue';

/**
 * Интерфейс options для useDeviceIs
 */
export interface IDeviceIsOptions {
    /**
     * Флаг, указывающий, следует ли создавать медиа-запросы при монтировании компоненте
     */
    mount: boolean;

    /**
     * Точки останова для адаптивного дизайна
     */
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
    /**
     * Точки останова для адаптивного дизайна
     */
    breakpoints?: Record<string, number>;
}
