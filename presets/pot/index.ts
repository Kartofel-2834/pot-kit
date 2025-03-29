// Types
import type { IPotPreset } from './types';

// Components configurations
import { PotButtonConfig } from './pot-button';
import { PotCheckboxConfig } from './pot-checkbox';
import { PotInputConfig } from './pot-input';
import { PotGridConfig } from './pot-grid';

export const PotPreset: IPotPreset = {
    breakpoints: {
        mobile: 0,
        tablet: 768,
        laptop: 1280,
        desktop: 1440,
    },

    size: ['tiny', 'small', 'medium', 'large'],

    color: {
        pot: {
            /* Default */
            target: 'var(--pot-color-mushroom-300)',
            border: 'var(--pot-color-mushroom-300)',
            subcolor: 'var(--pot-base-400)',
            text: 'var(--pot-base-0)',
    
            /* Hover */
            hoverTarget: 'var(--pot-color-mushroom-200)',
            hoverBorder: 'var(--pot-color-mushroom-200)',
            hoverSubcolor: 'var(--pot-base-500)',
            hoverText: 'var(--pot-base-0)',
    
            /* Active */
            activeTarget: 'var(--pot-color-mushroom-400)',
            activeBorder: 'var(--pot-color-mushroom-400)',
            activeSubcolor: 'var(--pot-base-600)',
            activeText: 'var(--pot-base-0)',
    
            /* Disabled */
            disabledTarget: 'var(--pot-base-400)',
            disabledBorder: 'var(--pot-base-400)',
            disabledSubcolor: 'var(--pot-base-500)',
            disabledText: 'var(--pot-base-0)',
        }
    },

    radius: {
        circle: 'calc(var(--pot-spacer) * 100)',
        large: '0.5em',
        medium: '0.4em',
        small: '0.3em',
        tiny: '0.2em',
        'radius-8': 8,
        'radius-6': 6,
        'radius-4': 4,
        'radius-2': 2
    },
    
    gap: {
        large: 'var(--pot-spacer-2)',
        medium: 'var(--pot-spacer-1-600)',
        small: 'var(--pot-spacer)',
        tiny: 'var(--pot-spacer-0-600)'
    },

    components: {
        button: PotButtonConfig,
        checkbox: PotCheckboxConfig,
        input: PotInputConfig,
        grid: PotGridConfig,
    }
};