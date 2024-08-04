// Vue
import { createApp } from 'vue';

// Plugins
import deviceIs from '@/plugins/device-is.js';

// Components
import App from '@/App.vue';

const app = createApp(App);

app.use(deviceIs);

app.mount('#app');
