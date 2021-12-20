import { EditResult } from "../../entities/EditResult";
import { ApplyTextChangesHandler } from "../edit-result/EditResultComponentProps";

export interface EditResultPageProps {
    editResult: EditResult;
    onApplyTextChanges: ApplyTextChangesHandler;
}
