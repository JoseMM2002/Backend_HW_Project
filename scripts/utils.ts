import readline from 'readline';
import { syncDb } from '../src/database/connection';

export class AsyncReadlineInterface extends readline.Interface {
    constructor(rl: {
        input: NodeJS.ReadableStream;
        output: NodeJS.WritableStream;
    }) {
        super(rl);
    }
    asyncQuestion(
        query: string,
        process?: (str: string) => string
    ): Promise<string> {
        return new Promise(resolve => {
            this.question(query, (input: string) => {
                let result = input;
                if (process) {
                    result = process(input);
                }
                resolve(result);
            });
        });
    }
}

export const rl = new AsyncReadlineInterface({
    input: process.stdin,
    output: process.stdin
});

export const run = (fn: (rl: AsyncReadlineInterface) => Promise<void>) => {
    const init = Date.now();
    fn(rl)
        .then(() => {
            const end = Date.now();
            console.log(`Operation took ${end - init} miliseconds.`);
            rl.close();
        })
        .catch(error => {
            const end = Date.now();
            console.error(`Operation failed after ${end - init} miliseconds.`);
            console.error(error);
            rl.close();
        });
};

export const emailValidator = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) throw new Error("Input isn't an email");
};

export const numberValidator = (input: string) => {
    const num = parseInt(input);
    if (Number.isNaN(num)) throw new Error("Input isn't a number");
};
