// Types
import type { App } from 'vue';

/**
 * Интерфейс для плагинов Vue
 */
export interface IVuePlugin<T = unknown> {
    install: (app: App, options?: T) => void;
}
