// Types
import type { TPotPresetCheckbox } from "./types";

export const PotCheckboxConfig: TPotPresetCheckbox = {
    defaults: {
        color: 'pot',
        size: 'medium',
        radius: 'medium',
    },

    color: {
        /* --- BASE --- */
        text: 'inherit',                 
        background: 'transparent',                
        icon: 'var(--color-text)',
        border: 'var(--color-subcolor)',
        
        hoverText: 'inherit',
        hoverBackground: 'transparent',   
        hoverIcon: 'var(--color-hover-text)', 
        hoverBorder: 'var(--color-hover-subcolor)',
        
        pressedText: 'inherit',
        pressedBackground: 'transparent',   
        pressedIcon: 'var(--color-hover-text)', 
        pressedBorder: 'var(--color-hover-subcolor)',       
        /* --- BASE --- */


        /* --- CHECKED --- */
        checkedText: 'inherit',
        checkedBackground: 'var(--color-target)',        
        checkedBorder: 'var(--color-target)',   
        checkedIcon: 'var(--color-text)',
        
        checkedHoverText: 'inherit',
        checkedHoverBackground: 'var(--color-target)',
        checkedHoverIcon: 'var(--color-text)',
        checkedHoverBorder: 'var(--color-target)',

        checkedPressedText: 'inherit',
        checkedPressedBackground: 'var(--color-active-target)',   
        checkedPressedIcon: 'var(--color-active-text)',
        checkedPressedBorder: 'var(--color-active-target)',
        /* --- CHECKED --- */


        /* --- INVALID --- */
        invalidText: 'inherit',
        invalidBorder: 'var(--pot-color-invalid)', 
        invalidBackground: 'var(--pot-color-invalid)',
        invalidIcon: 'var(--pot-color-invalid-text)',
        /* --- INVALID --- */


        /* --- DISABLED --- */
        disabledText: 'var(--color-disabled-subcolor)',
        disabledBorder: 'var(--color-disabled-target)',
        disabledBackground: 'var(--color-disabled-target)',
        disabledIcon: 'var(--color-disabled-text)',
        /* --- DISABLED --- */
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