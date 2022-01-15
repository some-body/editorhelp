import { EditError, ErrorCode, Suggest } from "../controllers/dto/edit-result-dto";
const { checkText : yaCheckText } = require('yaspeller');
const Eyo = require('eyo-kernel');

const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync();

export class SpellCheck {

    async checkTexts (texts: string[]): Promise<EditError[][]> {
        return Promise.all(texts.map((t) => this.checkText(t)));
    }

    async checkText (text: string): Promise<EditError[]> {
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
                    const mappedResult: EditError[] = result.map((e) => {
                        const code = getCode(e);
                        return {
                            len: getLen(e),
                            pos: getPos(e),
                            suggests: getSuggests(e),
                            code: code,
                            title: getTitle(code),
                        };
                    });

                    res(mappedResult);

                } catch(parseError) {
                    rej(parseError);
                }

            }, {lang: 'ru', format: 'plain', checkYo: true, options: { findRepeatWords: true }});
        });
    }
}

function getLen (checkRes: any): number {
    if (Number.isInteger(checkRes.len)) {
        return checkRes.len;
    }

    if (typeof(checkRes.word) !== 'string') {
        throw Error('Cannot parse len from error.');
    }

    return checkRes.word.length;
}

function getPos (checkRes: any): number {
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

function getSuggests (checkRes: any): Suggest[] {
    const suggests = checkRes.s;

    const isValidSuggests = Array.isArray(suggests) 
        && suggests.every((suggest: any) => typeof(suggest) === 'string');

    if (!isValidSuggests) {
        throw Error('Cannot parse suggests from error.');
    }

    // Eyo is not applied to suggests in yaspeller – do it manually.
    const suggestStringsWithYo = suggests.map((s) => safeEyo.restore(s));

    return suggestStringsWithYo.map((s): Suggest => ({ title: s, value: s }));
}

function getCode (checkRes: any): ErrorCode {
    switch (checkRes.code) {
        case 1: return 'TYPO';
        case 2: return 'DUPLICATES';
        case 100: return 'YO';
        default: return 'UNKNOWN';
    }
}

function getTitle (code: ErrorCode): string {
    switch (code) {
        case 'DUPLICATES': return 'Дубликат';
        case 'YO': return 'Буква ё';
        case 'TYPO':
        case 'UNKNOWN':
        default: return 'Ошибка';
    }
}
