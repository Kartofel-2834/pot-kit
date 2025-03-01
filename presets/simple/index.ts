// Types
import type { ISimplePreset } from './types';

// Components configurations
import { PotButtonConfig } from './pot-button';

export const SimplePreset: ISimplePreset = {
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
            target: 'var(--pot-color-frog-300)',
            border: 'var(--pot-color-frog-300)',
            subcolor: 'var(--pot-base-500)',
            text: 'var(--pot-base-0)',
    
            /* Hover */
            hoverTarget: 'var(--pot-color-frog-200)',
            hoverBorder: 'var(--pot-color-frog-200)',
            hoverSubcolor: 'var(--pot-base-500)',
            hoverText: 'var(--pot-base-0)',
    
            /* Active */
            activeTarget: 'var(--pot-color-frog-400)',
            activeBorder: 'var(--pot-color-frog-400)',
            activeSubcolor: 'var(--pot-base-500)',
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
        large: 10,
        medium: 6,
        small: 4,
        tiny: 2
    },
    
    gap: {
        large: 'var(--pot-spacer-2)',
        medium: 'var(--pot-spacer-1-600)',
        small: 'var(--pot-spacer)',
        tiny: 'var(--pot-spacer-0-600)'
    },

    components: {
        button: PotButtonConfig,
    }
};