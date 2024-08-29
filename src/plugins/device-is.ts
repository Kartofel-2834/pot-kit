// Types
import type { App, Plugin } from 'vue';
import type { DeviceIs, IDeviceIsPluginOptions } from '@/types/composables/device-is-types';

// Constants
import { breakpoints as bp } from '@/assets/ts/constants/breakpoints';

// Composables
import { useDeviceIs } from '@/composables/device-is';

/**
 * Этот плагин позволяет компонентам легко определять текущий размер
 * экрана на основе предопределенных брейкпоинтов
 *
 * @param app - Экземпляр приложения Vue.
 * @param [options] - Необязательный объект конфигурации.
 * @param [options.breakpoints] - Настраиваемый объект точек перелома для адаптивного дизайна.
 * Если не указан, будут использованы стандартные брейкпоинты из 'assets/js/constants/breakpoints'.
 */
function deviceIsPluginInit(app: App, options?: IDeviceIsPluginOptions): void {
    const breakpoints: Record<string, number> = options?.breakpoints || bp;
    const deviceIs: DeviceIs = useDeviceIs({ mount: false, breakpoints });

    app.mixin({
        mounted() {
            deviceIs?.init();
        },

        unmounted() {
            deviceIs?.clear();
        },
    });

    app.provide('deviceIs', deviceIs);
    app.config.globalProperties.$deviceIs = deviceIs;
}

const deviceIsPlugin: Plugin<IDeviceIsPluginOptions> = { install: deviceIsPluginInit };

export default deviceIsPlugin;
