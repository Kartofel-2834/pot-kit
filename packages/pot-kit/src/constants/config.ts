// Types
import { IPotKitInstallationConfig } from '../types';

export const DEFAULT_CONFIG: IPotKitInstallationConfig = {
    components: './@pot-kit/components/',
    styles: './@pot-kit/styles/',
    composables: './@pot-kit/composables/',
    types: './@pot-kit/types/',
    imports: {},
    prefix: 'pot',
    potServer: false,
    overwrite: false,
};
