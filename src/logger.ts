// Node
import { styleText } from 'util';

export const logger = {
    log: (message: string) => console.log(styleText('cyanBright', `[POT] ${message}`)),
    success: (message: string) => console.log(styleText('green', `[POT] ${message}`)),
    info: (message: string) => console.info(styleText('cyan', `[POT] ${message}`)),
    time: (message: string) => console.time(styleText('magentaBright', `[POT] ${message}`)),
    timeEnd: (message: string) => console.timeEnd(styleText('magentaBright', `[POT] ${message}`)),
    warn: (message: string) => console.warn(styleText('yellow', `[POT] ${message}\n`)),
    error: (message: string, err?: Error | string) => {
        console.error(styleText('red', `[POT] ${message}\n`), ...(err ? [err, '\n'] : []));
    },
};
