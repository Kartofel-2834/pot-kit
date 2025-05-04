// Node
import { styleText } from "util";

export const logger = {
    log: (message: string) => console.log(styleText('cyanBright', `[POT] ${message}`)),
    warn: (message: string) => console.warn(styleText('yellow', `[POT] ${message}\n`)),
    success: (message: string) => console.log(styleText('green', `[POT] ${message}`)),
    error: (message: string, err?: Error) => console.error(styleText('red', `[POT] ${message}\n`), err, '\n'),
    info: (message: string) => console.info(styleText('cyan', `[POT] ${message}`)),
    time: (message: string) => console.time(styleText('magentaBright', `[POT] ${message}`)),
    timeEnd: (message: string) => console.timeEnd(styleText('magentaBright', `[POT] ${message}`)),
};
