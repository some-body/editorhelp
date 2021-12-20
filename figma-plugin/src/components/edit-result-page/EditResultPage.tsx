import React, { useCallback, useState } from 'react';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { EditState } from '../edit-result/EditResultComponentProps';
import { EditResultPageProps } from './EditResultPageProps';

export function EditResultPage (
    { editResult, onApplyTextChanges }: EditResultPageProps,
): JSX.Element {

    const [resultIndex, setResultIndex] = useState<number>(0);
    const [initHtml, setInitHtml] = useState<string>(undefined);

    const [editStates, setEditStates] = useState<Record<number, EditState>>({})

    const showPrev = useCallback(() => {
        if (resultIndex <= 0) {
            return;
        }

        const newIndex = resultIndex - 1;
        
        setResultIndex(newIndex);
        setInitHtml(editStates[newIndex]?.html);
    }, [editResult, resultIndex, editStates]);

    const showNext = useCallback(() => {
        const newIndex = resultIndex + 1;

        if (newIndex >= editResult.textEditResults.length) {
            return;
        }

        setResultIndex(newIndex);
        setInitHtml(editStates[newIndex]?.html);
    }, [editResult, resultIndex, editStates]);

    const onUpdate = useCallback((editState: EditState) => {
        setEditStates({
            ...editStates,
            [resultIndex]: editState,
        });
    }, [resultIndex, editStates]);

    const onApply = useCallback(() => {
        const textEditResult = editResult.textEditResults[resultIndex];
        const newText = editStates[resultIndex].text;

        onApplyTextChanges(textEditResult, newText);

        showNext();
    }, [onApplyTextChanges, editStates, resultIndex, editResult]);

    return (
        <div className="edit-result-page">
            <EditResultComponent 
                editResult={editResult.textEditResults[resultIndex]}
                onUpdate={onUpdate}
                initHtml={initHtml}
            />

            <div className="edit-result-page__buttons-bar">
                <button onClick={showPrev}>Предыдущий</button>
                <button onClick={onApply}>Сбросить</button>
                <button onClick={onApply}>Применить</button>
                <button onClick={showNext}>Следующий</button>
            </div>
        </div>
    );
}
