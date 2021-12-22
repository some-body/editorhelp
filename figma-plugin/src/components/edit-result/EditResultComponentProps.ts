import { TextEditResult } from "../../entities/EditResult";

export interface EditState {
    html: string;
    text: string;
}

export type StateChangeHandler = (state?: EditState) => void;

export interface EditResultComponentProps {
    editResult: TextEditResult;
    initState?: EditState;
    isModified: boolean;
    onUpdate: StateChangeHandler;
    onApply: () => void;
    onNext: () => void;
    onPrev: () => void;
}
