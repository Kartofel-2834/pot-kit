// Types
import type { TPotPresetLink } from "./types";

export const PotLinkConfig: TPotPresetLink = {
    defaults: {
        color: 'pot',
        size: 'medium'
    },

    color: {
        text: 'var(--pot-base-600)',
        underline: 'var(--color-target)', 
        underlineText: 'var(--pot-base-600)',

        hoverText: 'var(--color-hover-target)',
        hoverUnderline: 'var(--color-hover-target)',
        hoverUnderlineText: 'var(--pot-base-600)',
        
        activeText: 'var(--color-active-target)',
        activeUnderline: 'var(--color-active-target)',
        activeUnderlineText: 'var(--pot-base-600)',
    },

    size: {
        tiny: {
            text: 'var(--pot-font-size-100)',
            underline: 1,
            icon: 'var(--pot-font-size-100)',
        },

        small: {
            text: 'var(--pot-font-size-200)',
            underline: 1,
            icon: 'var(--pot-font-size-200)',
        },

        medium: {
            text: 'var(--pot-font-size-300)',
            underline: 2,
            icon: 'var(--pot-font-size-300)',
        },

        large: {
            text: 'var(--pot-font-size-400)',
            underline: 2,
            icon: 'var(--pot-font-size-400)',
        }
    }
};