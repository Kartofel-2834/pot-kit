// Node
import { fileURLToPath, URL } from 'node:url';

// Config
import { defineConfig } from 'vite';

// Plugins
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import potKit from './vite-pot-kit-plugin';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        potKit()
    ],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/scss/bundle";
                    @import "@/assets/scss/default";
                    @import "@/assets/scss/reset";
                    @import "@/assets/scss/config";
                `,
            },
        },
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
