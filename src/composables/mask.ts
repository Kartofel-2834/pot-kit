export type MaskPlaceholder = RegExp | string | number | null;

const defaultPlaceholders: Record<string, MaskPlaceholder>  = {
    '#': /^[0-9]$/,
    'A': /^[a-zA-Z]$/,
    'N': /^[a-zA-Z0-9]$/,
    'X': /^.$/,
    'Я': /^[\wа-яА-Я]$/,
    '?': NaN,
};

function getPlaceholderTest(placeholder: MaskPlaceholder): (v: string) => boolean {
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
    placeholders: Record<string, MaskPlaceholder> = {}
): string {
    if (!data || typeof data !== 'string') {
        return data;
    }

    const letters = Array.from(data);
    const currentPlaceholders = {
        ...defaultPlaceholders,
        ...placeholders
    };

    let isRequired = true;
    const result = Array.from(mask);

    for (let index = 0; index < result.length; index++) {
        const placeholder = currentPlaceholders[result[index]];

        if (placeholder === undefined) {
            continue;
        }

        if (typeof placeholder === 'number' && isNaN(placeholder)) {
            isRequired = false;
            result[index] = '';
            continue;
        }

        const letterIndex = letters.findIndex(getPlaceholderTest(placeholder));

        if (letterIndex !== -1) {
            const currentLetter = letters[letterIndex];
            letters.splice(letterIndex, 1);
            result[index] = currentLetter;
        } else if (isRequired) {
            result[index] = '';
            return result.slice(0, index).filter(Boolean).join('');
        } else {
            result[index] = '';
            isRequired = true;
        }
    }

    return result.filter(Boolean).join('');
}