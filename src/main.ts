// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';

// Plugins
import deviceIsPlugin from './plugins/device-is';

// Components
import App from '@/App.vue';

const app: Application = createApp(App);

app.use(deviceIsPlugin);

app.mount('#app');
