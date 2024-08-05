// Types
import type { App } from 'vue';

export interface IVuePlugin {
    install: (app: App, options?: any) => void;
}
