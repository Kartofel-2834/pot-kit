/* NOT EDIT! THIS ENUMS GENERATED AUTOMATICALLY! */

/* Color */
export const UI_COLOR = {
    POT: 'pot'
} as const;

export type EUiColor = typeof UI_COLOR[keyof typeof UI_COLOR];

/* Radius */
export const UI_RADIUS = {
    CIRCLE: 'circle',
    LARGE: 'large',
    MEDIUM: 'medium',
    SMALL: 'small',
    TINY: 'tiny',
    RADIUS__8: 'radius-8',
    RADIUS__6: 'radius-6',
    RADIUS__4: 'radius-4',
    RADIUS__2: 'radius-2'
} as const;

export type EUiRadius = typeof UI_RADIUS[keyof typeof UI_RADIUS];

/* Gap */
export const UI_GAP = {
    LARGE: 'large',
    MEDIUM: 'medium',
    SMALL: 'small',
    TINY: 'tiny'
} as const;

export type EUiGap = typeof UI_GAP[keyof typeof UI_GAP];

/* Device */
export const UI_DEVICE = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    LAPTOP: 'laptop',
    DESKTOP: 'desktop'
} as const;

export type EUiDevice = typeof UI_DEVICE[keyof typeof UI_DEVICE];

export const UI_BREAKPOINT: { readonly [key in EUiDevice]: number; } = {
    mobile: 0,
    tablet: 768,
    laptop: 1280,
    desktop: 1440
};

export const ALL_DEVICES = Object.keys(UI_BREAKPOINT) as EUiDevice[];

export const ALL_DEVICES_REVERSED = Object.keys(UI_BREAKPOINT).reverse() as EUiDevice[];

/* Size */
export const UI_SIZE = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
} as const;

export type EUiSize = typeof UI_SIZE[keyof typeof UI_SIZE];