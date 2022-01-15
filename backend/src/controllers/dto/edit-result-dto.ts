export interface Suggest {
    value: string;
    title: string;
}

export type ErrorCode = 'TYPO' | 'DUPLICATES' | 'YO' | 'UNKNOWN';

export interface EditError {
    pos: number;
    len: number;
    code: ErrorCode;
    title?: string;
    suggests: Suggest[];
}

export interface TextEditResult {
    errors: EditError[];
}

export interface EditResultDto {
    textEditResults: TextEditResult[];
}
