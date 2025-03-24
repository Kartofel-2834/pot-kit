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

// Plugins
import { potKitPlugin } from '@/plugins';

function initApp() {
    const app: Application = createApp(App);

    // Plugins init
    app.use(potKitPlugin({
        button: {
            color: 'pot',
            size: 'medium',
            radius: 'large',
        }
    }));

    // Mounting app to page
    app.mount('#app');
}

initApp();



