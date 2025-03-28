// Types
import type { ObjectValues } from "@/types";

export const POT_TOOLTIP_POSITION = {
    TOP_START: 'top-start',
    TOP_END: 'top-end',
    TOP_CENTER: 'top-center',

    BOTTOM_START: 'bottom-start',
    BOTTOM_END: 'bottom-end',
    BOTTOM_CENTER: 'bottom-center',

    RIGHT_START: 'right-start',
    RIGHT_END: 'right-end',
    RIGHT_CENTER: 'right-center',

    LEFT_START: 'left-start',
    LEFT_END: 'left-end',
    LEFT_CENTER: 'left-center',
} as const;

export type EPotTooltipPosition = ObjectValues<typeof POT_TOOLTIP_POSITION>;

