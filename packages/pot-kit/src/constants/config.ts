// Types
import { IPotKitInstallationConfig } from '../types';

export const DEFAULT_CONFIG: IPotKitInstallationConfig = {
    components: './src/components/ui/',
    styles: './src/assets/css/ui/',
    composables: './src/composables/',
    types: './src/types/pot-kit/',
    imports: {
        '@': './src',
    },
    options: {
        prefix: 'pot',
        potServer: false,
        overwrite: false,
    },
};
