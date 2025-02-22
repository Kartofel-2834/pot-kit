// Types
import type { ObjectValues } from "@/types";

export const POT_GAP = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'big',
    LARGE: 'large',
} as const;

export type EPotGap = ObjectValues<typeof POT_GAP>;