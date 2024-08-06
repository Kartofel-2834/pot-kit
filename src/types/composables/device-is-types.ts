// Types
import type { Ref } from 'vue';

export type DeviceIsOptions = {
    mount: boolean;
    breakpoints: Record<string, number>;
};

export type DeviceIs = {
    state: Ref<Record<string, boolean>>;
    device: Ref<string | null>;
    init: () => void;
    clear: () => void;
    update: () => void;
};

export type DeviceIsPluginOptions = {
    breakpoints?: Record<string, number>;
};
