// Types
import type { IPotButtonConfig, IPotKitConfig } from '../../vite-pot-kit-plugin/types';

type TPotPresetSize = 'tiny' | 'small' | 'medium' | 'large';

// Components
export interface IPotPresetButton extends IPotButtonConfig<TPotPresetSize> {};

export interface IPotPreset extends IPotKitConfig<TPotPresetSize> {};
