// Types
import type { TPotPresetLink } from "./types";

export const PotLinkConfig: TPotPresetLink = {
    defaults: {
        color: 'pot',
        size: 'medium'
    },

    color: {
        text: 'inherit',
        icon: 'inherit',
        line: 'inherit',

        hoverText: 'red',
        hoverIcon: 'red',
        hoverLine: 'red',

        pressedText: 'green',
        pressedIcon: 'green',
        pressedLine: 'green',

        activeText: 'blue',
        activeIcon: 'blue',
        activeLine: 'blue',

        activeHoverText: 'purple',
        activeHoverIcon: 'purple',
        activeHoverLine: 'purple',

        activePressedText: 'pink',
        activePressedIcon: 'pink',
        activePressedLine: 'pink',

        disabledText: 'grey',
        disabledIcon: 'grey',
        disabledLine: 'grey',
    },

    size: {
        tiny: {
            text: 'var(--pot-font-size-100)',
            line: 1,
            icon: 'var(--pot-font-size-100)',
        },

        small: {
            text: 'var(--pot-font-size-200)',
            line: 1,
            icon: 'var(--pot-font-size-200)',
        },

        medium: {
            text: 'var(--pot-font-size-300)',
            line: 2,
            icon: 'var(--pot-font-size-300)',
        },

        large: {
            text: 'var(--pot-font-size-400)',
            line: 2,
            icon: 'var(--pot-font-size-400)',
        }
    }
};