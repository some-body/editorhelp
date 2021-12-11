import { SpellCheckError } from "../entities/spell-check-error";

const { checkTexts } = require('yandex-speller');

export class SpellCheck {

    async checkTexts(texts: string[]): Promise<SpellCheckError[][]> {
        return new Promise((res, rej) => {
            checkTexts(texts, (err?: any, result?: any) => {
                if (err) {
                    rej(err);
                    return;
                }

                if (!Array.isArray(result)) {
                    rej(Error('Unsupported spellcheck result format.'));
                    return;
                }

                res(result);
            });
        });
    }
}
