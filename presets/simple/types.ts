// Types
import type { IPotButtonConfig, IPotKitConfig } from '../../vite-pot-kit-plugin/types';

type TSimplePresetSize = 'tiny' | 'small' | 'medium' | 'large';

// Components
export interface ISimplePresetButton extends IPotButtonConfig<TSimplePresetSize> {};

export interface ISimplePreset extends IPotKitConfig<TSimplePresetSize> {};
