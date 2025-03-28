// Types
import type { Ref } from 'vue';
import type { EPotDevice } from '@/enums/preset';

export type TDeviceIsMediaQueries = Partial<Record<EPotDevice, MediaQueryList>>

export type TDeviceIsState = Partial<Record<EPotDevice, boolean>>

export type TDeviceIs = {
    /** Акутальные статусы всех брейкпоинтов */
    state: Ref<TDeviceIsState>;

    /** Текущий активный брейкпонт */
    device: Ref<EPotDevice | null>;
};

