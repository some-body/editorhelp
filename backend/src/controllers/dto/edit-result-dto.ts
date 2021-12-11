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

export interface TextEditResult {
    errors: EditError[];
}

export interface EditResultDto {
    textEditResults: TextEditResult[];
}
