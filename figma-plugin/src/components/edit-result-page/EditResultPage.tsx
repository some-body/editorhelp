import React, { useCallback, useState } from 'react';
import { EditResultComponent } from '../edit-result/EditResultComponent';
import { EditResultPageProps } from './EditResultPageProps';

export function EditResultPage ({editResult}: EditResultPageProps): JSX.Element {
    const [resultIndex, setResultIndex] = useState<number>(0);

    const showNext = useCallback(() => {
        const newIndex = resultIndex + 1;

        if (newIndex >= editResult.textEditResults.length) {
            return;
        }

        setResultIndex(newIndex);
    }, []);

    return (
        <div className="edit-result-page">
            <EditResultComponent 
                editResult={editResult.textEditResults[resultIndex]} 
                onNextClick={showNext}
            />
        </div>
    );
}
