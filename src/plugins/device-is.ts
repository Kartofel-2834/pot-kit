// Types
import type { App, Plugin } from 'vue';
import type { TDeviceIs } from '@/types/composables/device-is-types';

// Composables
import { initQueries, useDeviceIs } from '@/composables/device-is';

const deviceIs: TDeviceIs = useDeviceIs();

/**
 * Этот плагин позволяет компонентам легко определять текущий размер
 * экрана на основе предопределенных брейкпоинтов
 *
 * @param app - Экземпляр приложения Vue.
 */
function deviceIsPluginInit(app: App): void {
    app.provide('deviceIs', deviceIs);
    app.config.globalProperties.$deviceIs = deviceIs;
}

export const plugin: Plugin = { install: deviceIsPluginInit };

export const init = () => initQueries();
