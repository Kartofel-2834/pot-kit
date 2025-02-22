// Types
import type { ObjectValues } from "@/types";

export const POT_RADIUS = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'big',
    LARGE: 'large',
    CIRCLE: 'circle',
} as const;

export type EPotRadius = ObjectValues<typeof POT_RADIUS>;