// Types
import type { TPotPresetCheckbox } from "./types";

export const PotCheckboxConfig: TPotPresetCheckbox = {
    color: {
        base: {
            text: 'inherit',
            background: 'transparent',
            icon: 'var(--color-text)',
            border: 'var(--color-subcolor)',
        },

        hover: {
            text: 'inherit',
            background: 'transparent',
            icon: 'var(--color-hover-text)',
            border: 'var(--color-hover-subcolor)',
        },

        checked: {
            text: 'inherit',
            background: 'var(--color-target)',
            icon: 'var(--color-text)',
            border: 'var(--color-target)',
        },

        checkedPressed: {
            text: 'inherit',
            background: 'var(--color-active-target)',
            icon: 'var(--color-active-text)',
            border: 'var(--color-active-target)',
        },

        invalid: {
            text: 'inherit',
            background: 'var(--color-invalid-target)',
            icon: 'var(--color-invalid-text)',
            border: 'var(--color-invalid-target)',
        },

        disabled: {
            text: 'var(--color-disabled-subcolor)',
            border: 'var(--color-disabled-target)',
            background: 'var(--color-disabled-target)',
            icon: 'var(--color-disabled-text)',
        }
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