export type TMaskPlaceholder = RegExp | string | number | null;

export const defaultPlaceholders: Record<string, TMaskPlaceholder>  = {
    '#': /^[0-9]$/,
    'A': /^[a-zA-Z]$/,
    'N': /^[a-zA-Z0-9]$/,
    'X': /^.$/,
    'Я': /^[\wа-яА-Я]$/,
};

function getPlaceholderTest(placeholder: TMaskPlaceholder): (v: string) => boolean {
    if (
        typeof placeholder === 'string' ||
        (typeof placeholder === 'number' && !isNaN(placeholder) && isFinite(placeholder))
    ) {
        return (v: string) => v === String(placeholder);
    }

    if (placeholder instanceof RegExp) {
        return (v: string) => placeholder.test(v);
    }

    return () => false;
}

export function useMask(
    data: string,
    mask: string,
    placeholders: Record<string, TMaskPlaceholder> = {}
): string {
    if (!data || typeof data !== 'string') {
        return data;
    }

    const letters = Array.from(data);
    const currentPlaceholders = {
        ...defaultPlaceholders,
        ...placeholders
    };

    let lastPlaceholderIndex = 0;
    const result = Array.from(mask);

    for (let index = 0; index < result.length; index++) {
        const placeholder = currentPlaceholders[result[index]];

        if (placeholder === undefined) {
            continue;
        }

        const letterIndex = letters.findIndex(getPlaceholderTest(placeholder));

        if (letterIndex === -1) {
            result[index] = '';
            return result.slice(0, lastPlaceholderIndex + 1).filter(Boolean).join('');
        }

        const currentLetter = letters[letterIndex];
        letters.splice(letterIndex, 1);
        result[index] = currentLetter;
        lastPlaceholderIndex = index;
    }

    return result.filter(Boolean).join('');
}

    
export function removeMask(
    value: string,
    mask: string,
    placeholders: Record<string, TMaskPlaceholder> = {}
): string {
    if (!value || typeof value !== 'string') {
        return value;
    }

    const currentPlaceholders = {
        ...defaultPlaceholders,
        ...placeholders
    };

    let result = '';

    for (let index = 0; index < mask.length; index++) {
        if (!value[index]) {
            break;
        }

        const placeholder = currentPlaceholders[mask[index]];

        if (placeholder || value[index] !== mask[index]) {
            result += value[index];
        }
    }

    return result;
}