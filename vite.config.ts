// Node
import { fileURLToPath, URL } from 'node:url';

// Config
import { defineConfig } from 'vite';

// Plugins
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import potKit, { IPotKitConfig } from 'vite-pot-kit-plugin';

// Preset
import { PotPreset } from './preset';

const config: IPotKitConfig = { ...PotPreset };

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            defaultImport: 'raw'
        }),
        potKit(config)
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./lib', import.meta.url)),
            '$': fileURLToPath(new URL('./test', import.meta.url)),
        },
    },
});
