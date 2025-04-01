// Types
import type { TPotPresetButton } from "./types";

export const PotButtonConfig: TPotPresetButton = {
    defaults: {
        radius: 'medium',
        size: 'medium',
        color: 'pot',
    },

    color: {
        border: 'var(--color-border)',
        background: 'var(--color-target)',
        text: 'var(--color-text)',

        hoverBorder: 'var(--color-hover-border)',
        hoverBackground: 'var(--color-hover-target)',
        hoverText: 'var(--color-hover-text)',
        
        pressedBorder: 'var(--color-active-target)',
        pressedBackground: 'var(--color-active-target)',
        pressedText: 'var(--color-active-text)',
        
        disabledBorder: 'var(--pot-base-400)',
        disabledBackground: 'var(--pot-base-400)',
        disabledText: 'var(--color-disabled-text)',
    },

    size: {
        tiny: {
            height: 'var(--pot-spacer-3-200)',
            text: 'var(--pot-font-size-200)',
            padding: 'var(--pot-spacer-1-200)',
            gap: 'var(--pot-spacer-0-800)',
            icon: 'var(--pot-spacer-1-400)',
            border: 1,
        },

        small: {
            height: 'var(--pot-spacer-3-600)',
            text: 'var(--pot-font-size-200)',
            padding: 'var(--pot-spacer-1-600)',
            gap: 'var(--pot-spacer-0-800)',
            icon: 'var(--pot-spacer-1-600)',
            border: 1,
        },

        medium: {
            height: 'var(--pot-spacer-4-800)',
            text: 'var(--pot-font-size-200)',
            padding: 'var(--pot-spacer-2)',
            gap: 'var(--pot-spacer-1-200)',
            icon: 'var(--pot-spacer-1-600)',
            border: 1
        },

        large: {
            height: 'var(--pot-spacer-5-600)',
            text: 'var(--pot-font-size-300)',
            padding: 'var(--pot-spacer-2-800)',
            gap: 'var(--pot-spacer-1-200)',
            icon: 'var(--pot-spacer-2)',
            border: 1
        }
    }
};