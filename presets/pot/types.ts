// Types
import type {
    IPotButtonConfig,
    IPotCheckboxConfig,
    IPotKitConfig
} from '../../vite-pot-kit-plugin/types';

type TPotPresetSize = 'tiny' | 'small' | 'medium' | 'large';

// Components
export interface IPotPresetButton extends IPotButtonConfig<TPotPresetSize> {};
export interface IPotPresetCheckbox extends IPotCheckboxConfig<TPotPresetSize> {};

export interface IPotPreset extends IPotKitConfig<TPotPresetSize> {};
