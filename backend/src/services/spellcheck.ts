import { SpellCheckError } from "../entities/spell-check-error";
const { checkText : yaCheckText } = require('yaspeller');
const Eyo = require('eyo-kernel');

const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync();

export class SpellCheck {

    async checkTexts (texts: string[]): Promise<SpellCheckError[][]> {
        return Promise.all(texts.map((t) => this.checkText(t)));
    }

    async checkText (text: string): Promise<SpellCheckError[]> {
        return new Promise((res, rej) => {
            yaCheckText(text, (err?: any, result?: any) => {
                if (err) {
                    rej(err);
                    return;
                }

                if (!Array.isArray(result)) {
                    rej(Error('Unsupported spellcheck result format.'));
                    return;
                }

                try {
                    const mappedResult: SpellCheckError[] = result.map((e) => ({
                        len: getLen(e),
                        pos: getPos(e),
                        s: getSuggests(e),
                    }));

                    res(mappedResult);

                } catch(parseError) {
                    rej(parseError);
                }

            }, {lang: 'ru', format: 'plain', checkYo: true, options: { findRepeatWords: true }});
        });
    }
}

function getLen(checkRes: any): number {
    if (Number.isInteger(checkRes.len)) {
        return checkRes.len;
    }

    if (typeof(checkRes.word) !== 'string') {
        throw Error('Cannot parse len from error.');
    }

    return checkRes.word.length;
}

function getPos(checkRes: any): number {
    if (Number.isInteger(checkRes.pos)) {
        return checkRes.pos;
    }

    const { position } = checkRes;
    if (!Array.isArray(position)) {
        throw Error('Cannot parse pos from error (position is not an array).');
    }

    const [firstPos = {}] = position;

    if (!Number.isInteger(firstPos.index)) {
        throw Error('Cannot parse pos from error.');
    }

    return firstPos.index;
}

function getSuggests(checkRes: any): string[] {
    const suggests = checkRes.s;

    const isValidSuggests = Array.isArray(suggests) 
        && suggests.every((suggest: any) => typeof(suggest) === 'string');

    if (!isValidSuggests) {
        throw Error('Cannot parse suggests from error.');
    }

    // Eyo is not applied to suggests in yaspeller – do it manually.
    return suggests.map((s) => safeEyo.restore(s));
}
