// Constants
import { bp } from '@/assets/js/constants/breakpoints';

// Composables
import { useDeviceIs } from '@/composables/device-is.js';

/**
 * Этот плагин позволяет компонентам легко определять текущий размер экрана на основе предопределенных брейкпоинтов
 *
 * @param {Object} app - Экземпляр приложения Vue.js.
 * @param {Object} [options] - Необязательный объект конфигурации.
 * @param {Object} [options.breakpoints] - Настраиваемый объект точек перелома. Если не указан, будут использованы стандартные точки перелома из 'assets/js/constants/breakpoints'.
 *
 * @returns {void}
 */
function deviceIsPluginInit(app, options) {
    const breakpoints = options?.breakpoints || bp;
    const deviceIs = useDeviceIs({ mount: false, breakpoints });

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

export default { install: deviceIsPluginInit };
