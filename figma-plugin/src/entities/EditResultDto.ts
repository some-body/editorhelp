export interface Suggest {
    value: string;
    title: string;
}

export interface EditError {
    pos: number;
    len: number;
    code: string;
    title?: string;
    suggests: Suggest[];
}

export interface TextEditResultDto {
    errors: EditError[];
}

export interface EditResultDto {
    textEditResults: TextEditResultDto[];
}

export function getEditResultFromJson(json: any): EditResultDto {
    const { textEditResults } = json || {};

    if (!Array.isArray(textEditResults)) {
        throw Error(`Cannot parse EditResult: ${json}`);
    }

    const parsedResults = textEditResults.map(getTextEditResultFromJson);

    return { textEditResults: parsedResults };
}

function getTextEditResultFromJson (json: any): TextEditResultDto {
    const { errors } = json || {};

    if (!Array.isArray(errors)) {
        throw Error(`Cannot parse TextEditResult: ${json}`);
    }

    const parsedErrors = errors.map(getEditErrorFromJson);

    return { errors: parsedErrors };
};

function getEditErrorFromJson (json: any): EditError {
    const { pos, len, code, title, suggests = [] } = json || {};

    const isValidNumbers = Number.isInteger(pos) && Number.isInteger(len);

    if (typeof(code) !== 'string' || !isValidNumbers || !Array.isArray(suggests)) {
        throw Error(`Cannot parse EditError: ${json}`);
    }

    const parsedSuggests = suggests.map(getSuggestFromJson);

    return { pos, len, code, title, suggests: parsedSuggests };
}

function getSuggestFromJson (json: any): Suggest {
    const { value, title } = json || {};
    if (typeof(value) !== 'string' || typeof(title) !== 'string') {
        throw Error(`Cannot parse Suggest: ${json}`);
    }

    return { value, title };
}
