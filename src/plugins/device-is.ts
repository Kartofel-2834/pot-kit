// Types
import type { App, Plugin } from 'vue';
import type { DeviceIs } from '@/types/composables/device-is-types';

// Composables
import { useDeviceIs } from '@/composables/device-is';

/**
 * Этот плагин позволяет компонентам легко определять текущий размер
 * экрана на основе предопределенных брейкпоинтов
 *
 * @param app - Экземпляр приложения Vue.
 */
function deviceIsPluginInit(app: App): void {
    const deviceIs: DeviceIs = useDeviceIs(false);
    deviceIs.init();

    app.provide('deviceIs', deviceIs);
    app.config.globalProperties.$deviceIs = deviceIs;
}

const deviceIsPlugin: Plugin = { install: deviceIsPluginInit };

export default deviceIsPlugin;
