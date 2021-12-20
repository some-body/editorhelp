import { TextEditResult } from "../../entities/EditResult";

export type ApplyTextChangesHandler = (editResult: TextEditResult, text: string) => void;

export interface EditResultComponentProps {
    editResult: TextEditResult;
    onNextClick: () => void;
    onApplyClick: ApplyTextChangesHandler;
}
