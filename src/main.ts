// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';

// Plugins
import deviceIsPlugin from './plugins/device-is';

// Components
import App from '@/App.vue';
import type { IDeviceIsPluginOptions } from './types/composables/device-is-types';

const app: Application = createApp(App);

app.use<IDeviceIsPluginOptions[]>(deviceIsPlugin);

app.mount('#app');
