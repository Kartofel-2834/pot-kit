// Styles
import '@/assets/css/variables.css';
import '@/assets/css/reset.css';
import '@/assets/css/preset/index.css';

// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';

// Plugins
import { plugin as deviceIsPlugin, init as initDeviceIs } from './plugins/device-is';

// Components
import App from '@/App.vue';

function initApp() {
    const app: Application = createApp(App);
    
    // Plugins setup
    app.use(deviceIsPlugin);

    // Mounting app to page
    app.mount('#app');

    // After mount actions
    initDeviceIs();
}

initApp();



