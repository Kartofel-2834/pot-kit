/* NOT EDIT! This file generated automatically */

/* Color-theme */
export const POT_COLOR_THEME = {
    PRIMARY: 'primary',
    ONION: 'onion',
    CUCUMBER: 'cucumber',
    BEETROT: 'beetrot',
    CORN: 'corn',
    POT: 'pot'
} as const;

export type EPotColorTheme = typeof POT_COLOR_THEME[keyof typeof POT_COLOR_THEME];

/* Device */
export const POT_DEVICE = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    LAPTOP: 'laptop',
    DESKTOP: 'desktop'
} as const;

export type EPotDevice = typeof POT_DEVICE[keyof typeof POT_DEVICE];

export const POT_BREAKPOINT: { readonly [key in EPotDevice]: number; } = {
    mobile: 0,
    tablet: 768,
    laptop: 1280,
    desktop: 1440
};

/* Size */
export const POT_SIZE = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'big',
    LARGE: 'large'
} as const;

export type EPotSize = typeof POT_SIZE[keyof typeof POT_SIZE];