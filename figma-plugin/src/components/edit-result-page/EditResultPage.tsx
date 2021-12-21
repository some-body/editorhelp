import React, { useCallback, useState } from 'react';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { EditState } from '../edit-result/EditResultComponentProps';
import { EditResultPageProps } from './EditResultPageProps';

export function EditResultPage (
    { editResult, onApplyTextChanges }: EditResultPageProps,
): JSX.Element {

    const [resultIndex, setResultIndex] = useState<number>(0);
    const [editStates, setEditStates] = useState<Record<number, EditState>>({});
    const [currInitState, setCurrInitState] = useState<EditState>(undefined)

    const update = useCallback((editState: EditState) => {
        setEditStates({
            ...editStates,
            [resultIndex]: editState,
        });
    }, [resultIndex, editStates]);

    const showPrev = useCallback(() => {
        if (resultIndex <= 0) {
            return;
        }

        const newIndex = resultIndex - 1;
        setResultIndex(newIndex);
        setCurrInitState(editStates[newIndex]);
    }, [resultIndex]);

    const showNext = useCallback(() => {
        if (resultIndex >= editResult.textEditResults.length - 1) {
            return;
        }

        const newIndex = resultIndex + 1;
        setResultIndex(newIndex);
        setCurrInitState(editStates[newIndex]);
    }, [editResult, resultIndex]);

    const apply = useCallback(() => {
        const textEditResult = editResult.textEditResults[resultIndex];
        const newText = editStates[resultIndex].text;

        onApplyTextChanges(textEditResult, newText);
    }, [onApplyTextChanges, resultIndex, editResult, editStates]);

    return (
        <div className="edit-result-page">
            <EditResultComponent 
                editResult={editResult.textEditResults[resultIndex]}
                initState={currInitState}
                onUpdate={update}
                onPrev={showPrev}
                onNext={showNext}
                onApply={apply}
            />
        </div>
    );
}
