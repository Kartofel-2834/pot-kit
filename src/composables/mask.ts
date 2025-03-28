export type TMaskPlaceholder = RegExp | null;

export interface IMaskPlaceholders {
    [key: string]: RegExp | null;
}


export const defaultPlaceholders: IMaskPlaceholders  = {
    '#': /[0-9]/,
    'A': /[a-zA-Z]/,
    'N': /[a-zA-Z0-9]/,
    'X': /./,
    'Я': /[\wа-яА-Я]/,
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

export function useMask(value: string, mask: string, placeholders: IMaskPlaceholders = {}) {
    const currentPlaceholders = { ...defaultPlaceholders, ...placeholders };

    let result = '';
    let currentValue = `${value}`;

    for (const maskChar of mask) {
        const placeholder = currentPlaceholders[maskChar];

        if (!(placeholder instanceof RegExp)) {
            result += maskChar;
            continue;
        } else if (!currentValue) {
            return result;
            // result += '_';
            // continue;
        }
        
        const charMatch = currentValue.match(placeholder);
        
        if (!charMatch || charMatch?.index === undefined) {
            return result;
            // result += '_';
            // continue;
        }

        result += charMatch[0];
        currentValue = currentValue.slice(0, charMatch.index) + currentValue.slice(charMatch.index + 1);
    }

    return result;
}

export function removeMask(value: string, mask: string, placeholders: IMaskPlaceholders = {}) {
    const currentPlaceholders = { ...defaultPlaceholders, ...placeholders };

    let result = '';

    for (let index = 0; index < mask.length; index++) {
        const char = value[index];

        if (!char) {
            return result;
        }

        const maskChar = mask[index];
        const placeholder = currentPlaceholders[maskChar];

        if (placeholder instanceof RegExp && placeholder.test(char)) {
            result += char;
        }
    }

    return result;
}

// export function useMask(
//     data: string,
//     mask: string,
//     placeholders: Record<string, TMaskPlaceholder> = {}
// ): string {
//     if (!data || typeof data !== 'string') {
//         return data;
//     }

//     const letters = Array.from(data);
//     const currentPlaceholders = {
//         ...defaultPlaceholders,
//         ...placeholders
//     };

//     let lastPlaceholderIndex = 0;
//     const result = Array.from(mask);

//     for (let index = 0; index < result.length; index++) {
//         const placeholder = currentPlaceholders[result[index]];

//         if (placeholder === undefined) {
//             continue;
//         }

//         const letterIndex = letters.findIndex(getPlaceholderTest(placeholder));

//         if (letterIndex === -1) {
//             result[index] = '';
//             return result.slice(0, lastPlaceholderIndex + 1).filter(Boolean).join('');
//         }

//         const currentLetter = letters[letterIndex];
//         letters.splice(letterIndex, 1);
//         result[index] = currentLetter;
//         lastPlaceholderIndex = index;
//     }

//     return result.filter(Boolean).join('');
// }

    
// export function removeMask(
//     value: string,
//     mask: string,
//     placeholders: Record<string, TMaskPlaceholder> = {}
// ): string {
//     if (!value || typeof value !== 'string') {
//         return value;
//     }

//     const currentPlaceholders = {
//         ...defaultPlaceholders,
//         ...placeholders
//     };

//     let result = '';

//     for (let index = 0; index < mask.length; index++) {
//         if (!value[index]) {
//             break;
//         }

//         const placeholder = currentPlaceholders[mask[index]];

//         if (placeholder || value[index] !== mask[index]) {
//             result += value[index];
//         }
//     }

//     return result;
// }