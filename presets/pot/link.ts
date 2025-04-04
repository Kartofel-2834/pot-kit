// Types
import type { TPotPresetLink } from "./types";

export const PotLinkConfig: TPotPresetLink = {
    defaults: {
        color: 'pot',
        size: 'medium',
    },

    color: {
        base: {
            text: 'inherit',
            icon: 'inherit',
            line: 'var(--color-target)'
        },

        hover: {
            text: 'var(--color-target)',
            icon: 'var(--color-target)',
            line: 'var(--color-target)'
        },

        active: {
            text: 'var(--color-active-target)',
            icon: 'var(--color-active-target)',
            line: 'var(--color-active-target)'
        },

        underline: {
            text: 'inherit',
            icon: 'inherit',
            line: 'var(--color-target)',
        },

        underlineHover: { 
            text: 'inherit',
            icon: 'inherit',
            line: 'var(--color-target)'
        },

        disabled: {
            text: 'var(--color-disabled-target)',
            icon: 'var(--color-disabled-target)',
            line: 'var(--color-disabled-target)'
        }
    },

    size: {
        tiny: {
            text: 'var(--pot-font-size-200)',
            line: 1,
            icon: 'var(--pot-font-size-200)',
        },

        small: {
            text: 'var(--pot-font-size-400)',
            line: 2,
            icon: 'var(--pot-font-size-400)',
        },

        medium: {
            text: 'var(--pot-font-size-500)',
            line: 2,
            icon: 'var(--pot-font-size-500)',
        },

        large: {
            text: 'var(--pot-font-size-600)',
            line: 2,
            icon: 'var(--pot-font-size-600)',
        }
    }
};