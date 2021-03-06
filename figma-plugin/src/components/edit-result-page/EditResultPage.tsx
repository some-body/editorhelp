import React, { useCallback, useEffect, useState } from 'react';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { EditState, StateChangeHandler } from '../edit-result/EditResultComponentProps';
import { EditResultPageProps } from './EditResultPageProps';
import './EditResultPage.css';

export function EditResultPage (
    { editResult, onApplyTextChanges, navigateToNode }: EditResultPageProps,
): JSX.Element {
    const [editResults, setEditResults] = useState(editResult.textEditResults);

    const [resultIndex, setResultIndex] = useState<number>(0);
    const [editStates, setEditStates] = useState<Record<number, EditState>>({});

    const hasPrev = resultIndex > 0;
    const hasNext = resultIndex < editResults.length - 1;

    const update: StateChangeHandler = useCallback((editState: EditState) => {
        const newEditStates = { ...editStates };

        if (editState) {
            newEditStates[resultIndex] = editState;
        } else {
            delete newEditStates[resultIndex];
        }
        setEditStates(newEditStates);
    }, [resultIndex, editStates]);

    useEffect(() => {
        navigateToNode(editResults[0].node);
    }, []);

    const showPrev = useCallback(() => {
        if (!hasPrev) {
            return;
        }

        const newIndex = resultIndex - 1;
        setResultIndex(newIndex);
        navigateToNode(editResults[newIndex].node);
    }, [resultIndex]);

    const showNext = useCallback(() => {
        if (!hasNext) {
            return;
        }

        const newIndex = resultIndex + 1;
        setResultIndex(newIndex);
        navigateToNode(editResults[newIndex].node);
    }, [editResult, resultIndex]);

    const apply = useCallback(() => {
        const textEditResult = editResults[resultIndex];

        const editState = editStates[resultIndex];
        const newText = editState?.text || textEditResult.originalText;

        onApplyTextChanges(textEditResult, newText);
        
        const newEditResults = [...editResults];
        newEditResults[resultIndex] = {
            ...editResults[resultIndex],
            originalText: newText,
            errors: [],
        };

        setEditResults(newEditResults);

        if (editState) {
            setEditStates({
                ...editStates,
                [resultIndex]: {
                    text: editState.text,
                    html: undefined,
                },
            });
        }

    }, [onApplyTextChanges, resultIndex, editResult, editStates]);

    const editState = editStates[resultIndex];
    const isModified = editState && editState.text !== editResults[resultIndex].originalText;

    return (
        <div className="edit-result-page">
            <EditResultComponent 
                editResult={editResults[resultIndex]}
                initState={editStates[resultIndex]}
                isModified={isModified}
                onUpdate={update}
                onPrev={showPrev}
                onNext={showNext}
                onApply={apply}
                hasPrev={hasPrev}
                hasNext={hasNext}
            />
        </div>
    );
}
