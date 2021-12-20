import { NodeDto } from "../../src/common/PluginMessage";
import { TextEditResult } from "../../src/entities/EditResult";
import { EditError } from "../../src/entities/EditResultDto";
import { GroupToken, TextToken, Token, TokenError, Tokenizator } from "../../src/services/Tokenizator";

const ERROR_CODE = 'code';
const tokenError = new TokenError(ERROR_CODE);

const node: NodeDto = { nodeId: '123', text: '321' };

describe('Tokenizator', () => {

    const underTest = new Tokenizator();

    it('should not mutate errors array', () => {
        const origErrors = [getError(100), getError(10)];
        const savedOrigErrors = [...origErrors];
        const editResult: TextEditResult = {
            errors: origErrors,
            originalText: 'Hello, Peter',
            node,
        };

        underTest.tokenize(editResult);

        expect(origErrors).toEqual(savedOrigErrors);
    });

    it('should get group token from text with error in error', () => {
        // He[llo [inner_error] Pete]r
        const text = 'Hello inner_error Peter';
        const editResult: TextEditResult = {
            errors: [getError(2, 20), getError(6, 11)],
            originalText: text,
            node,
        };

        const result = underTest.tokenize(editResult);

        const expected = [
            new TextToken('He'),
            groupToken([
                new TextToken('llo '), 
                errorToken('inner_error'),
                new TextToken(' Pete'), 
            ]),
            new TextToken('r'),
        ];
        expect(result).toEqual(expected);
    });

    it('should expand outer error token when inner error ends outside of parent', () => {
        // He[llo [inner_error]] Peter
        const text = 'Hello inner_error Peter';
        const editResult: TextEditResult = {
            errors: [getError(2, 5), getError(6, 11)],
            originalText: text,
            node,
        };

        const result = underTest.tokenize(editResult);

        const expected = [
            new TextToken('He'),
            groupToken([
                new TextToken('llo '), 
                errorToken('inner_error'),
            ]),
            new TextToken(' Peter'),
        ];
        expect(result).toEqual(expected);
    });

    it('should handle one symbol overlap in errors', () => {
        // [H[el]]lo
        const text = 'Hello';
        const editResult: TextEditResult = {
            errors: [getError(0, 2), getError(1, 2)],
            originalText: text,
            node,
        };

        const result = underTest.tokenize(editResult);

        const expected = [
            groupToken([
                new TextToken('H'),
                errorToken('el'),
            ]),
            new TextToken('lo'),
        ];
        expect(result).toEqual(expected);
    });

    it('should return text between errors', () => {
        const text = 'Hello text Peter';
        const editResult: TextEditResult = {
            errors: [getError(0, 5), getError(11, 5)],
            originalText: text,
            node,
        };

        const result = underTest.tokenize(editResult);

        const expected = [
            errorToken('Hello'),
            new TextToken(' text '),
            errorToken('Peter'),
        ];
        expect(result).toEqual(expected);
    });


    it('should get single text token from text with no errors', () => {
        const editResult: TextEditResult = {
            errors: [],
            originalText: 'Hello, Peter',
            node,
        };

        const result = underTest.tokenize(editResult);

        const expected = [new TextToken('Hello, Peter')];
        expect(result).toEqual(expected);
    });
});

function getError(pos: number, len: number = 0): EditError {
    return { pos, len, code: ERROR_CODE, suggests: [] };
}

function errorToken(text: string): GroupToken {
    return new GroupToken([new TextToken(text)], tokenError);
}

function groupToken(tokens: Token[]): GroupToken {
    return new GroupToken(tokens, tokenError);
}