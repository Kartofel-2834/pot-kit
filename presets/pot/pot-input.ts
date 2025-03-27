// Types
import type { TPotPresetInput } from "./types";

export const PotInputConfig: TPotPresetInput = {
    color: {
        border: 'var(--color-subcolor)',
        background: 'var(--pot-base-0)',
        text: 'inherit',
        icon: 'var(--color-subcolor)',

        hoverBorder: 'var(--color-hover-subcolor)',
        hoverBackground: 'var(--pot-base-0)',
        hoverText: 'inherit',
        hoverIcon: 'var(--color-hover-subcolor)',
        
        focusedBorder: 'var(--color-active-target)',
        focusedBackground: 'var(--pot-base-0)',
        focusedText: 'inherit',
        focusedIcon: 'var(--color-active-subcolor)',
        
        disabledBorder: 'var(--pot-base-400)',
        disabledBackground: 'var(--pot-base-400)',
        disabledText: 'var(--color-disabled-text)',
        disabledIcon: 'var(--color-disabled-text)',
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