/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */

/* Color */
export const POT_COLOR = {
    POT: 'pot'
} as const;

export type EPotColor = typeof POT_COLOR[keyof typeof POT_COLOR];

/* Radius */
export const POT_RADIUS = {
    CIRCLE: 'circle',
    LARGE: 'large',
    MEDIUM: 'medium',
    SMALL: 'small',
    TINY: 'tiny',
    RADIUS_8: 'radius8',
    RADIUS_6: 'radius6',
    RADIUS_4: 'radius4',
    RADIUS_2: 'radius2'
} as const;

export type EPotRadius = typeof POT_RADIUS[keyof typeof POT_RADIUS];

/* Gap */
export const POT_GAP = {
    LARGE: 'large',
    MEDIUM: 'medium',
    SMALL: 'small',
    TINY: 'tiny'
} as const;

export type EPotGap = typeof POT_GAP[keyof typeof POT_GAP];

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
    LARGE: 'large'
} as const;

export type EPotSize = typeof POT_SIZE[keyof typeof POT_SIZE];