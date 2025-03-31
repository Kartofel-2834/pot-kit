// Types
import { TPotPresetRadio } from "./types";

export const PotRadioConfig: TPotPresetRadio = {
    defaults: {
        color: 'pot',
        size: 'medium',
        radius: 'circle',
    },

    color: {
        text: 'inherit',
        marker: 'transparent',
        markerBorder: 'var(--color-subcolor)',
        markerBackground: 'transparent',
        markerPoint: 'transparent',

        hoverText: 'inherit',
        hoverMarker: 'transparent',
        hoverMarkerBorder: 'var(--color-hover-subcolor)',
        hoverMarkerBackground: 'transparent',
        hoverMarkerPoint: 'transparent',
        
        activeText: 'inherit',
        activeMarker: 'var(--color-active-target)',
        activeMarkerBorder: 'var(--color-active-target)',
        activeMarkerBackground: 'var(--color-active-target)',
        activeMarkerPoint: 'var(--pot-base-0)',

        disabledText: 'inherit',
        disabledMarker: 'var(--color-disabled-target)',
        disabledMarkerBorder: 'var(--color-disabled-target)',
        disabledMarkerBackground: 'var(--color-disabled-target)',
        disabledMarkerPoint: 'var(--pot-base-0)',
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