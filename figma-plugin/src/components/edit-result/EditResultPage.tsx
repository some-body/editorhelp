import React from 'react';
import { EditResultPageProps } from './EditResultPageProps';

export function EditResultPage ({editResult}: EditResultPageProps): JSX.Element {

    // TODO: Попросить отнавигироваться к нужной штуке.

    // const err = editResult.textEditResults[0].

    return (
        <div className="edit-result-page">
            <pre className="edit-result-page__text">

            </pre>

            <div className="edit-result-page__buttons-bar">
                <button>Применить</button>
                <button>Пропустить</button>
            </div>
        </div>
    );
}
