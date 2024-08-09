// Types
import type { Ref } from 'vue';

export interface IDeviceIsOptions {
    mount: boolean;
    breakpoints: Record<string, number>;
}

export type DeviceIs = {
    state: Ref<Record<string, boolean>>;
    device: Ref<string | null>;
    init: () => void;
    clear: () => void;
    update: () => void;
};

export interface IDeviceIsPluginOptions {
    breakpoints?: Record<string, number>;
}
