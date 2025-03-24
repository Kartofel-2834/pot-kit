// Types
import type { App, Plugin } from 'vue';
import type { IPotKitPluginOptions } from '@/types/plugins';

/**
 * Этот плагин позволяет компонентам легко определять текущий размер
 * экрана на основе предопределенных брейкпоинтов
 *
 * @param app - Экземпляр приложения Vue.
 */
export function potKitPlugin(options: IPotKitPluginOptions): Plugin {  
    return {
        install: (app: App) => {
            app.provide('pot-config', options);
        }
    };
}