// Styles
import '@/assets/css/variables.css';
import '@/assets/css/reset.css';
import '@/assets/css/preset/index.css';

// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';

// Components
import App from '@/App.vue';

function initApp() {
    const app: Application = createApp(App);

    // Mounting app to page
    app.mount('#app');
}

initApp();



