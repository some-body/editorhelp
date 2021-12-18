import React from 'react';
import { GroupToken, TextToken, TokenError, Tokenizator } from '../../services/Tokenizator';
import { EditResultComponentProps } from './EditResultComponentProps';
import './EditResultComponent.css';
import { GroupTokenComponent, TextTokenComponent } from '../token/TokenComponent';

const tokenizator = new Tokenizator();

export function EditResultComponent (
    { editResult, onNextClick }: EditResultComponentProps,
): JSX.Element {
    // TODO: Попросить отнавигироваться к нужной штуке.

    // const origTokens = tokenizator.tokenize(editResult);

    const origTokens = [
        new GroupToken([
            new TextToken('Hello '),
            new GroupToken([
                new TextToken('Peter'),
            ], new TokenError('error2', [{ title: 'Potter', value: 'Potter' }, { title: 'Parker', value: 'Parker' }])),
        ], new TokenError('error1', [{ title: 'Hey Buddy', value: 'Hey Buddy' }, { title: 'HELL NO', value: 'HELL NO' }])),
        new TextToken(', I am Doc'),
    ];

    const root = new GroupToken(origTokens);

    return (
        <div className="edit-result">
            <pre className="edit-result__text">
                <GroupTokenComponent token={root} />
            </pre>

            <div className="edit-result__buttons-bar">
                <button>Применить</button>
                <button>Пропустить</button>
            </div>
        </div>
    );
}
