// Types
import type { Ref } from 'vue';

export type TDeviceIsMediaQueries<TDevice extends string = string> = Partial<Record<TDevice, MediaQueryList>>

export type TDeviceIsState<TDevice extends string = string> = Partial<Record<TDevice, boolean>>

export type TDeviceIs<TDevice extends string = string> = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<TDeviceIsState<TDevice>>;

    /** Текущий активный брейкпонт */
    device: Ref<TDevice | null>;
};

