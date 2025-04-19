// Types
import { TPotPresetRadio } from "./types";

export const PotRadioConfig: TPotPresetRadio = {
    color: {
        base: {
            text: 'inherit',
            border: 'var(--color-subcolor)',
            background: 'transparent',
            point: 'transparent',
        },

        hover: {
            text: 'inherit',
            border: 'var(--color-hover-subcolor)',
            background: 'transparent',
            point: 'transparent',
        },

        checked: {
            text: 'inherit',
            border: 'var(--color-active-target)',
            background: 'var(--color-active-target)',
            point: 'var(--pot-base-0)',
        },

        invalid: {
            text: 'inherit',
            border: 'var(--color-invalid-target)',
            background: 'var(--color-invalid-target)',
            point: 'var(--color-invalid-text)',
        },

        disabled: {
            text: 'inherit',
            border: 'var(--color-disabled-target)',
            background: 'var(--color-disabled-target)',
            point: 'var(--pot-base-0)',
        },
    },

    size: {
        tiny: {
            text: 'var(--pot-spacer-1-600)',
            marker: 'var(--pot-spacer-1-600)',
            markerPoint: 'var(--pot-spacer-0-800)',
            markerBorder: 1,
            gap: '0.4em',
        },

        small: {
            text: 'var(--pot-spacer-1-800)',
            marker: 'var(--pot-spacer-1-800)',
            markerPoint: 'var(--pot-spacer)',
            markerBorder: 1,
            gap: '0.4em',
        },

        medium: {
            text: 'var(--pot-spacer-2)',
            marker: 'var(--pot-spacer-2)',
            markerPoint: 'var(--pot-spacer-1-200)',
            markerBorder: 1,
            gap: '0.4em',
        },

        large: {
            text: 'var(--pot-spacer-2-400)',
            marker: 'var(--pot-spacer-2-400)',
            markerPoint: 'var(--pot-spacer-1-600)',
            markerBorder: 1,
            gap: '0.4em',
        },
    }
};