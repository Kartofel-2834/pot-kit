// Types
import type { PathLike } from 'fs';

export interface IPotKitColorThemeState {
    text: string;
    subcolor: string;
    border: string;
    background: string;
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
}

export const potKitConfig: IPotKitConfig = {
    iconsPath: './src/assets/icons/',

    breakpoints: {
        mobile: 0,
        tablet: 768,
        laptop: 1280,
        desktop: 1440,
    },

    colorThemes: {
        /** PRIMARY */
        primary: {
            target: {
                background: 'var(--pot-color-sea-400)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                background: 'var(--pot-color-sea-300)',
                border: 'var(--pot-color-sea-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            active: {
                background: 'var(--pot-color-sea-400)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            disabled: {
                background: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** PRIMARY-OUTLINED */
        'primary-outlined': {
            target: {
                background: 'var(--pot-base-0)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-color-sea-400)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                background: 'var(--pot-color-pale-200)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-color-sea-400)',
                subcolor: 'var(--pot-base-400)',
            },

            active: {
                background: 'var(--pot-color-pale-400)',
                border: 'var(--pot-color-sea-400)',
                text: 'var(--pot-color-sea-400)',
                subcolor: 'var(--pot-base-400)',
            },

            disabled: {
                background: 'var(--pot-base-0)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-400)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Сucumber */
        cucumber: {
            target: {
                background: 'var(--pot-color-green-300)',
                border: 'var(--pot-color-green-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                background: 'var(--pot-color-green-200)',
                border: 'var(--pot-color-green-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            active: {
                background: 'var(--pot-color-green-400)',
                border: 'var(--pot-color-green-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            disabled: {
                background: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Tomato */
        pepper: {
            target: {
                background: 'var(--pot-color-red-300)',
                border: 'var(--pot-color-red-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                background: 'var(--pot-color-red-200)',
                border: 'var(--pot-color-red-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            active: {
                background: 'var(--pot-color-red-400)',
                border: 'var(--pot-color-red-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            disabled: {
                background: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Potato */
        potato: {
            target: {
                background: 'var(--pot-color-yellow-300)',
                border: 'var(--pot-color-yellow-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            hover: {
                background: 'var(--pot-color-yellow-200)',
                border: 'var(--pot-color-yellow-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            active: {
                background: 'var(--pot-color-yellow-400)',
                border: 'var(--pot-color-yellow-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            disabled: {
                background: 'var(--pot-base-400)',
                border: 'var(--pot-base-400)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            }
        },

        /** Pot */
        pot: {
            target: {
                background: 'var(--pot-color-grey-200)',
                border: 'var(--pot-color-grey-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-200)',
            },

            hover: {
                background: 'var(--pot-color-grey-300)',
                border: 'var(--pot-color-grey-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            active: {
                background: 'var(--pot-color-grey-200)',
                border: 'var(--pot-color-grey-200)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-400)',
            },

            disabled: {
                background: 'var(--pot-base-300)',
                border: 'var(--pot-base-300)',
                text: 'var(--pot-base-0)',
                subcolor: 'var(--pot-base-200)',
            }
        },
    },
};