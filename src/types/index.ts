// Types
import type { App } from 'vue';

/**
 * Интерфейс для создания плагинов Vue
 */
export interface IVuePlugin {
    install: (app: App, options?: unknown) => void;
}
