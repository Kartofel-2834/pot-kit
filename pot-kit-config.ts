// Types
import type { PathLike } from 'fs';

export interface IPotKitColorThemeState {
    text: string;
    subcolor: string;
    border: string;
    color: string;
}

export interface IPotKitColorTheme {
    target: IPotKitColorThemeState;
    hover: IPotKitColorThemeState;
    active: IPotKitColorThemeState;
    disabled: IPotKitColorThemeState;
}

export interface IPotKitConfig {
    iconsPath: PathLike;
    colorThemes: Record<string, IPotKitColorTheme>;
    breakpoints: Record<string, number>;
    sizes: Record<string, number>;
}

export const potKitConfig: IPotKitConfig = {
    iconsPath: './src/assets/icons/',

    breakpoints: {
        mobile: 0,
        tablet: 768,
        laptop: 1280,
        desktop: 1440,
    },

    sizes: {
        tiny: 0.6,
        small: 0.8,
        medium: 1,
        big: 1.2,
        large: 1.4,
    },

    colorThemes: {
        /** PRIMARY */
        primary: {
            target: {
                color: 'var(--pot-color-sea-400)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                color: 'var(--pot-color-sea-300)',
                border: 'var(--pot-color-sea-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            active: {
                color: 'var(--pot-color-sea-400)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            disabled: {
                color: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Onion */
        onion: {
            target: {
                color: 'var(--pot-color-peach-400)',
                border: 'var(--pot-color-peach-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                color: 'var(--pot-color-peach-300)',
                border: 'var(--pot-color-peach-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            active: {
                color: 'var(--pot-color-peach-400)',
                border: 'var(--pot-color-peach-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            disabled: {
                color: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Сucumber */
        cucumber: {
            target: {
                color: 'var(--pot-color-green-300)',
                border: 'var(--pot-color-green-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                color: 'var(--pot-color-green-200)',
                border: 'var(--pot-color-green-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            active: {
                color: 'var(--pot-color-green-400)',
                border: 'var(--pot-color-green-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            disabled: {
                color: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Beetrot */
        beetrot: {
            target: {
                color: 'var(--pot-color-red-300)',
                border: 'var(--pot-color-red-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                color: 'var(--pot-color-red-200)',
                border: 'var(--pot-color-red-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            active: {
                color: 'var(--pot-color-red-400)',
                border: 'var(--pot-color-red-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            disabled: {
                color: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Corn */
        corn: {
            target: {
                color: 'var(--pot-color-yellow-300)',
                border: 'var(--pot-color-yellow-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                color: 'var(--pot-color-yellow-200)',
                border: 'var(--pot-color-yellow-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            active: {
                color: 'var(--pot-color-yellow-400)',
                border: 'var(--pot-color-yellow-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            disabled: {
                color: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Pot */
        pot: {
            target: {
                color: 'var(--pot-color-grey-200)',
                border: 'var(--pot-color-grey-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                color: 'var(--pot-color-grey-300)',
                border: 'var(--pot-color-grey-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            active: {
                color: 'var(--pot-color-grey-200)',
                border: 'var(--pot-color-grey-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-500)',
            },

            disabled: {
                color: 'var(--pot-base-300)',
                border: 'var(--pot-base-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },
    },
};