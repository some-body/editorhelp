import { TextEditResultDto } from "./EditResultDto";

export interface TextEditResult extends TextEditResultDto {
    originalText: string;
}

export interface EditResult {
    textEditResults: TextEditResult[];
}
