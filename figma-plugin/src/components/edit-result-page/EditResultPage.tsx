import React, { useCallback, useState } from 'react';
import { TextEditResult } from '../../entities/EditResult';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { ApplyTextChangesHandler, EditState } from '../edit-result/EditResultComponentProps';
import { EditResultPageProps } from './EditResultPageProps';

export function EditResultPage (
    { editResult, onApplyTextChanges }: EditResultPageProps,
): JSX.Element {

    const [resultIndex, setResultIndex] = useState<number>(0);

    const showNext = useCallback(() => {
        const newIndex = resultIndex + 1;

        if (newIndex >= editResult.textEditResults.length) {
            return;
        }

        setResultIndex(newIndex);
    }, [editResult, resultIndex]);

    const [editStatesByNodeId, setEditStates] = useState<Record<string, EditState>>({})
 
    const onUpdate = useCallback((state: EditState) => {
        const nodeId = editResult.textEditResults[resultIndex].node.nodeId;

        setEditStates({
            ...editStatesByNodeId,
            [nodeId]: state,
        });
    }, [resultIndex, editStatesByNodeId, editResult]);

    const onApply = useCallback(() => {
        const textEditResult = editResult.textEditResults[resultIndex];
        const newText = editStatesByNodeId[textEditResult.node.nodeId].text;

        onApplyTextChanges(textEditResult, newText);

        showNext();
    }, [onApplyTextChanges, editStatesByNodeId, resultIndex, editResult]);

    return (
        <div className="edit-result-page">
            <EditResultComponent 
                editResult={editResult.textEditResults[resultIndex]}
                onUpdate={onUpdate}
            />

            <div className="edit-result-page__buttons-bar">
                <button onClick={onApply}>Применить</button>
                <button onClick={showNext}>Пропустить</button>
            </div>
        </div>
    );
}
