import React, { useCallback, useMemo, useState } from 'react';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { EditState, StateChangeHandler } from '../edit-result/EditResultComponentProps';
import { EditResultPageProps } from './EditResultPageProps';
import './EditResultPage.css';

export function EditResultPage (
    { editResult, onApplyTextChanges }: EditResultPageProps,
): JSX.Element {
    const [editResults, setEditResults] = useState(editResult.textEditResults);

    const [resultIndex, setResultIndex] = useState<number>(0);
    const [editStates, setEditStates] = useState<Record<number, EditState>>({});

    const update: StateChangeHandler = useCallback((editState: EditState) => {
        const newEditStates = { ...editStates };

        if (editState) {
            newEditStates[resultIndex] = editState;
        } else {
            delete newEditStates[resultIndex];
        }
        setEditStates(newEditStates);
    }, [resultIndex, editStates]);

    const showPrev = useCallback(() => {
        if (resultIndex <= 0) {
            return;
        }

        const newIndex = resultIndex - 1;
        setResultIndex(newIndex);
    }, [resultIndex]);

    const showNext = useCallback(() => {
        if (resultIndex >= editResults.length - 1) {
            return;
        }

        const newIndex = resultIndex + 1;
        setResultIndex(newIndex);
    }, [editResult, resultIndex]);

    const apply = useCallback(() => {
        const textEditResult = editResults[resultIndex];
        const newText = editStates[resultIndex]?.text || textEditResult.originalText;

        onApplyTextChanges(textEditResult, newText);
        
        const newEditResults = [...editResults];
        newEditResults[resultIndex] = {
            ...editResults[resultIndex],
            originalText: newText,
            errors: [],
        };

        setEditResults(newEditResults);
    }, [onApplyTextChanges, resultIndex, editResult, editStates]);

    const editState = editStates[resultIndex];
    const isChanged = editState && editState.text !== editResults[resultIndex].originalText;

    return (
        <div className="edit-result-page">
            { isChanged ? (
                <div className="edit-result-page__change-indicator">Изменения не применены</div>
            ) : null}
            <EditResultComponent 
                editResult={editResults[resultIndex]}
                initState={editStates[resultIndex]}
                onUpdate={update}
                onPrev={showPrev}
                onNext={showNext}
                onApply={apply}
            />
        </div>
    );
}
