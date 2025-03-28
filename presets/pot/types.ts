// Types
import type { IPotKitConfig } from '../../types';

type TPotPresetDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop';

type TPotPresetColor = 'pot';

type TPotPresetSize = 'tiny' | 'small' | 'medium' | 'large';

type TPotPresetRadius = 'circle' | 'large' | 'medium' | 'small' | 'tiny' | 'radius-8' | 'radius-6' | 'radius-4' | 'radius-2';

type TPotPresetGap = 'large' | 'medium' | 'small' | 'tiny';

export interface IPotPreset extends IPotKitConfig<
    TPotPresetDevice,
    TPotPresetColor,
    TPotPresetSize,
    TPotPresetRadius,
    TPotPresetGap
> {};

// Components
export type TPotPresetButton = IPotPreset['components']['button'];
export type TPotPresetCheckbox = IPotPreset['components']['checkbox']; 
export type TPotPresetInput = IPotPreset['components']['input']; 