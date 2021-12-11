import { TextEditResult } from "../entities/EditResult";
import { EditError } from "../entities/EditResultDto";

export enum TokenType { GroupError, Text, Error }

export interface Token {
    type: TokenType;
}

export class GroupErrorToken implements Token {
    type: TokenType.GroupError;
    tokens: Token[];

    constructor (tokens: Token[]) {
        this.tokens = tokens;
    }
}

export class TextToken implements Token {
    type: TokenType.Text;
    text: string;

    constructor (text: string) {
        this.text = text;
    }
}

export class ErrorToken implements Token {
    type: TokenType.Error;
    text: string;

    constructor (text: string) {
        this.text = text;
    }
}

interface TokenizationResult {
    tokensInRange: Token[];
    realRangeEnd: number;
}

export class Tokenizator {

    tokenize(editResult: TextEditResult): Token[] {
        // should not mutate the errors array.
        const errorsCopy = [...editResult.errors]; 
        const errors = errorsCopy.sort((e1, e2) => e1.pos - e2.pos);

        const { originalText } = editResult;

        const { tokensInRange } = this.tokenizeRange(originalText, 0, originalText.length, errors);

        return tokensInRange;
    }

    // 'Hello, inner_error, Peter' – length 25
    // [2, 20], [6, 11] -> He[llo, [inner_error], Pete]r
    // [2, 5], [6, 11] -> He[llo [inner_error]] Peter
    private tokenizeRange(text: string, start: number, end: number, errors: EditError[]): TokenizationResult {
        const tokens: Token[] = [];

        const firstInnerError = errors.find((err) => err.pos < end);
        const textUntil = firstInnerError 
            ? firstInnerError.pos
            : end;

        if (textUntil > start) {
            const textToToken = text.substring(start, textUntil);
            tokens.push(new TextToken(textToToken));
        }

        let currPosition = textUntil;
        
        if (currPosition >= end) {
            return { 
                tokensInRange: tokens, 
                realRangeEnd: currPosition,
            };
        }

        let errorsLeft = [...errors];
        while (errorsLeft.length > 0) {
            const currError = errorsLeft[0];

            const errEnd = currError.pos + currError.len;
            const nextErrors = errorsLeft.slice(1);
            const hasInnerErrors = nextErrors.some((nextErr) => (nextErr.pos < errEnd));

            if (hasInnerErrors) {
                const { tokensInRange, realRangeEnd } = this.tokenizeRange(text, currError.pos, errEnd, nextErrors);
                tokens.push(new GroupErrorToken(tokensInRange));

                currPosition = realRangeEnd;
                errorsLeft = errorsLeft.filter((err) => err.pos > realRangeEnd)
            } else {
                const textToToken = text.substring(currError.pos, errEnd);
                tokens.push(new ErrorToken(textToToken));
                currPosition = errEnd;
                errorsLeft = [...nextErrors];
            }
        }

        if (currPosition < end) {
            const textToToken = text.substring(currPosition, end);
            tokens.push(new TextToken(textToToken));
            currPosition = end;
        }

        return {
            tokensInRange: tokens,
            realRangeEnd: currPosition,
        };
    }
}
