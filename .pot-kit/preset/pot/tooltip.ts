// Types
import type { TPotPresetTooltip } from "./types";

export const PotTooltipConfig: TPotPresetTooltip = {
    color: {
        base: {
            shadow: 'var(--pot-shadow-300)',
            background: 'var(--pot-base-0)',
            text: 'inherit'
        },
    },

    size: {
        tiny: {
            text: 'var(--pot-font-size-200)',
            padding: 'var(--pot-spacer-1-200)',
        },

        small: {
            text: 'var(--pot-font-size-300)',
            padding: 'var(--pot-spacer-1-600)',
        },

        medium: {
            text: 'var(--pot-font-size-400)',
            padding: 'var(--pot-spacer-2)',
        },

        large: {
            text: 'var(--pot-font-size-500)',
            padding: 'var(--pot-spacer-2-400)',
        }
    }
};