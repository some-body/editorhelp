import { TextEditResult } from "../../entities/EditResult";

export type ApplyTextChangesHandler = (editResult: TextEditResult, text: string) => void;

export interface EditState {
    html: string;
    text: string;
}

export interface EditResultComponentProps {
    editResult: TextEditResult;
    initHtml?: string;
    onUpdate: (state: EditState) => void;
}
