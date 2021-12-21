import { EditResult, TextEditResult } from "../../entities/EditResult";

export type ApplyTextChangesHandler = (editResult: TextEditResult, text: string) => void;

export interface EditResultPageProps {
    editResult: EditResult;
    onApplyTextChanges: ApplyTextChangesHandler;
}
