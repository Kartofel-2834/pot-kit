// Node
import { fileURLToPath, URL } from 'node:url';

// Config
import { defineConfig } from 'vite';

// Plugins
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            defaultImport: 'raw',
        }),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./lib', import.meta.url)),
            $: fileURLToPath(new URL('./test', import.meta.url)),
        },
    },
});
