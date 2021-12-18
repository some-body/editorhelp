import { TextEditResult } from "../../entities/EditResult";

export interface EditResultComponentProps {
    editResult: TextEditResult;
    onNextClick: () => void;
}
