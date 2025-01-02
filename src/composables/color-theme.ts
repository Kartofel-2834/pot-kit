// Enums
import type { EColorTheme } from "@/enums/config";

export function useColorTheme(color?: EColorTheme): Record<string, string> {
    return {
        '--color': color ? `var(--${color})` : '',
        '--color-hover': color ? `var(--${color}-hover)` : '',
        '--color-active': color ? `var(--${color}-active)` : '',
        '--color-text': color ? `var(--${color}-text)` : '',
    };
}
