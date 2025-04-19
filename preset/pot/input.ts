// Types
import type { TPotPresetInput } from "./types";

export const PotInputConfig: TPotPresetInput = {
    color: {
        base: {
            border: 'var(--color-subcolor)',
            background: 'var(--pot-base-0)',
            text: 'inherit',
            icon: 'var(--color-subcolor)',
        },

        hover: {
            border: 'var(--color-hover-subcolor)',
            background: 'var(--pot-base-0)',
            text: 'inherit',
            icon: 'var(--color-hover-subcolor)',
        },

        focused: {
            border: 'var(--color-active-target)',
            background: 'var(--pot-base-0)',
            text: 'inherit',
            icon: 'var(--color-active-subcolor)',
        },

        invalid: {
            background: 'var(--color-invalid-text)',
            border: 'var(--color-invalid-target)',
            text: 'inherit',
            icon: 'var(--color-invalid-target)',
        },

        disabled: {
            border: 'var(--pot-base-400)',
            background: 'var(--pot-base-400)',
            text: 'var(--color-disabled-text)',
            icon: 'var(--color-disabled-text)',
        }
    },

    size: {
        tiny: {
            height: 'var(--pot-spacer-3-200)',
            text: 'var(--pot-font-size-200)',
            padding: 'var(--pot-spacer-1-200)',
            gap: 'var(--pot-spacer-0-800)',
            icon: 'var(--pot-spacer-1-600)',
            border: 1,
        },

        small: {
            height: 'var(--pot-spacer-3-600)',
            text: 'var(--pot-font-size-200)',
            padding: 'var(--pot-spacer-1-400)',
            gap: 'var(--pot-spacer-0-800)',
            icon: 'var(--pot-spacer-2)',
            border: 1,
        },

        medium: {
            height: 'var(--pot-spacer-4-800)',
            text: 'var(--pot-font-size-300)',
            padding: 'var(--pot-spacer-1-600)',
            gap: 'var(--pot-spacer-1-200)',
            icon: 'var(--pot-spacer-2-400)',
            border: 1
        },

        large: {
            height: 'var(--pot-spacer-5-600)',
            text: 'var(--pot-font-size-300)',
            padding: 'var(--pot-spacer-2)',
            gap: 'var(--pot-spacer-1-200)',
            icon: 'var(--pot-spacer-2-800)',
            border: 1
        }
    }
};