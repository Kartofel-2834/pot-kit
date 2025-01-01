// Types
import type { IColorThemeCssVars } from "@/types/composables";

// Enums
import type { EColorThemes } from "@/enums/config";

export function useColorTheme(color?: EColorThemes): IColorThemeCssVars {
    return {
        '--color': color ? `var(--${color})` : '',
        '--color-hover': color ? `var(--${color}-hover)` : '',
        '--color-active': color ? `var(--${color}-active)` : '',
        '--color-text': color ? `var(--${color}-text)` : '',
    };
}
