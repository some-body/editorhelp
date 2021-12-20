import React, { useCallback, useState } from 'react';
import { TextEditResult } from '../../entities/EditResult';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { ApplyTextChangesHandler } from '../edit-result/EditResultComponentProps';
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

    const apply: ApplyTextChangesHandler = useCallback((textEditResult, newText) => {
        onApplyTextChanges(textEditResult, newText)
        showNext();
    }, [onApplyTextChanges]);

    return (
        <div className="edit-result-page">
            <EditResultComponent 
                editResult={editResult.textEditResults[resultIndex]}
                onNextClick={showNext}
                onApplyClick={apply}
            />
        </div>
    );
}
