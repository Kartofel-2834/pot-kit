// Types
import type { IPotKitConfig } from '../../types';

type TPotPresetDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop';

type TPotPresetSize = 'tiny' | 'small' | 'medium' | 'large';

type TPotPresetRadius = 'circle' | 'large' | 'medium' | 'small' | 'tiny' | 'radius-8' | 'radius-6' | 'radius-4' | 'radius-2';

type TPotPresetGap = 'large' | 'medium' | 'small' | 'tiny';

type TPotPresetColor = 'pot';

export interface IPotPreset extends IPotKitConfig<
    TPotPresetDevice,               // TDevice
    TPotPresetColor,                // TColor
    TPotPresetSize,                 // TSize    
    TPotPresetRadius,               // TRadius
    TPotPresetGap                   // TGap
> {};

// Components
export type TPotPresetButton = IPotPreset['components']['button'];
export type TPotPresetCheckbox = IPotPreset['components']['checkbox']; 
export type TPotPresetInput = IPotPreset['components']['input'];
export type TPotPresetGrid = IPotPreset['components']['grid'];
export type TPotPresetGroup = IPotPreset['components']['group'];
export type TPotPresetIcon = IPotPreset['components']['icon'];