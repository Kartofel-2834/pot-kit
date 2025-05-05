// Types
import type { IPotKitConfig } from 'vite-pot-kit-plugin';

type TPotPresetSize = 'tiny' | 'small' | 'medium' | 'large';

export interface IPotPreset extends Required<IPotKitConfig<TPotPresetSize>> {};

// Components
export type TPotPresetButton = IPotPreset['components']['button'];
export type TPotPresetCheckbox = IPotPreset['components']['checkbox']; 
export type TPotPresetInput = IPotPreset['components']['input'];
export type TPotPresetGrid = IPotPreset['components']['grid'];
export type TPotPresetGroup = IPotPreset['components']['group'];
export type TPotPresetLink = IPotPreset['components']['link'];
export type TPotPresetRadio = IPotPreset['components']['radio'];
export type TPotPresetTooltip = IPotPreset['components']['tooltip'];