// Node
import { styleText } from 'util';

export const logger = {
    log: (message: string) => console.log(styleText('cyanBright', `[POT-GEN] ${message}`)),
    success: (message: string) => console.log(styleText('green', `[POT-GEN] ${message}`)),
    info: (message: string) => console.info(styleText('cyan', `[POT-GEN] ${message}`)),
    time: (message: string) => console.time(styleText('magentaBright', `[POT-GEN] ${message}`)),
    timeEnd: (message: string) => console.timeEnd(styleText('magentaBright', `[POT-GEN] ${message}`)),
    warn: (message: string) => console.warn(styleText('yellow', `[POT-GEN] ${message}\n`)),
    error: (message: string, err?: Error | string) => {
        console.error(styleText('red', `[POT-GEN] ${message}\n`), ...(err ? [err, '\n'] : []));
    },
};
