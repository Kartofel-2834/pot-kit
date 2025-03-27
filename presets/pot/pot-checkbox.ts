// Types
import type { TPotPresetCheckbox } from "./types";

export const PotCheckboxConfig: TPotPresetCheckbox = {
    color: {
        text: 'inherit',                 
        background: 'transparent',                
        icon: 'var(--color-text)',
        border: 'var(--color-subcolor)',
        
        hoverText: 'inherit',
        hoverBackground: 'transparent',   
        hoverIcon: 'var(--color-hover-text)', 
        hoverBorder: 'var(--color-hover-subcolor)',            

        checkedText: 'inherit',
        checkedBackground: 'var(--color-target)',        
        checkedBorder: 'var(--color-target)',   
        checkedIcon: 'var(--color-text)',  

        checkedHoverText: 'inherit',
        checkedHoverBackground: 'var(--color-active-target)',
        checkedHoverIcon: 'var(--color-active-text)',
        checkedHoverBorder: 'var(--color-active-target)',

        disabledText: 'var(--color-disabled-subcolor)',
        disabledBorder: 'var(--color-disabled-target)',
        disabledCheckedBackground: 'var(--color-disabled-target)',
        disabledBackground: 'transparent',
        disabledIcon: 'var(--color-disabled-text)',
    },

    size: {
        tiny: {
            height: 'var(--pot-spacer-2)',
            text: 'var(--pot-spacer-1-600)',
            icon: 'var(--pot-spacer-1-400)',
            border: 1,
            gap: '0.4em',
        },

        small: {
            height: 'var(--pot-spacer-2-400)',
            text: 'var(--pot-spacer-1-800)',
            icon: 'var(--pot-spacer-1-600)',
            border: 1,
            gap: '0.4em',
        },

        medium: {
            height: 'var(--pot-spacer-2-800)',
            text: 'var(--pot-spacer-2)',
            icon: 'var(--pot-spacer-1-800)',
            border: 1,
            gap: '0.4em',
        },

        large: {
            height: 'var(--pot-spacer-3-200)',
            text: 'var(--pot-spacer-2-400)',
            icon: 'var(--pot-spacer-2)',
            border: 1,
            gap: '0.4em',
        }
    }
};