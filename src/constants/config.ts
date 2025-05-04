// Types
import { IPotKitJsonConfig } from "../types";

export const DEFAULT_CONFIG: IPotKitJsonConfig = {
    components: "./src/components/ui/",
    styles: "./src/assets/css/ui/",
    composables: "./src/composables/",
    types: "./src/types/pot-kit/",
    imports: {
        "@": "./src"
    },
    options: {
        prefix: 'pot',
        stylesImport: true,
        potServer: false,
        overwrite: false,
    }
};
