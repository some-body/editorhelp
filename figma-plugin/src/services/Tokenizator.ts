import { TextEditResult } from "../entities/EditResult";
import { EditError, Suggest } from "../entities/EditResultDto";

export enum TokenType { Group, Text, Error }

export interface Token {
    type: TokenType;
}

export class TextToken implements Token {
    type = TokenType.Text;
    text: string;

    constructor (text: string) {
        this.text = text;
    }
}

export class TokenError {
    errorTitle: string;
    suggests: Suggest[];

    constructor (
        errorTitle: string,
        suggests: Suggest[] = [],
    ) {
        this.errorTitle = errorTitle;
        this.suggests = suggests;
    }
}

export class GroupToken implements Token {
    type = TokenType.Group;
    tokens: Token[];
    error?: TokenError;

    constructor (
        tokens: Token[],
        error: TokenError | undefined = undefined,
    ) {
        this.tokens = tokens;
        this.error = error;
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

    private tokenizeRange(text: string, start: number, end: number, errors: EditError[]): TokenizationResult {
        const tokens: Token[] = [];

        let currPosition = start;

        let errorsLeft = [...errors];
        while (errorsLeft.length > 0) {
            const currError = errorsLeft[0];

            if (currPosition < currError.pos) {
                const textToToken = text.substring(currPosition, currError.pos);
                tokens.push(new TextToken(textToToken));
                currPosition = currError.pos;
            }

            const errEnd = currError.pos + currError.len;
            const nextErrors = errorsLeft.slice(1);
            const hasInnerErrors = nextErrors.some((nextErr) => (nextErr.pos < errEnd));

            if (hasInnerErrors) {
                const { tokensInRange, realRangeEnd } = this.tokenizeRange(text, currError.pos, errEnd, nextErrors);
                const tokenError = new TokenError(currError.title, currError.suggests);
                tokens.push(new GroupToken(tokensInRange, tokenError));

                currPosition = realRangeEnd;
                errorsLeft = errorsLeft.filter((err) => err.pos > realRangeEnd)
            } else {
                const textToToken = text.substring(currError.pos, errEnd);
                const tokenError = new TokenError(currError.title, currError.suggests);
                tokens.push(new GroupToken([new TextToken(textToToken)], tokenError));
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
