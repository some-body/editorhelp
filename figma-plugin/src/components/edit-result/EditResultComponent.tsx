import React, { FormEvent, useCallback, useEffect, useRef } from 'react';
import { GroupToken, TextToken, TokenError, Tokenizator } from '../../services/Tokenizator';
import { EditResultComponentProps } from './EditResultComponentProps';
import './EditResultComponent.css';
import { ERROR_CLASS, ERROR_DATA_ATTR, groupTokenComponentToString } from '../token/TokenComponent';
import { useMutations } from '../../hooks/use-mutations';

const tokenizator = new Tokenizator();

const HOVERED_CLASS = 'hovered';

function removeErrorForAllParents(root: HTMLElement, node: HTMLElement) {
    if (node === root) {
        return;
    }

    node.classList.remove(ERROR_CLASS);
    node.removeAttribute(ERROR_DATA_ATTR);

    removeErrorForAllParents(root, node.parentElement);
}

function addHoverToNearestError (root: HTMLElement, node: HTMLElement) {
    if (node === root) {
        return;
    }

    if (node.classList.contains(ERROR_CLASS)) {
        node.classList.add(HOVERED_CLASS);
        return;
    }

    addHoverToNearestError(root, node.parentElement);
}

function removeHoverClasses (root: HTMLElement) {
    root.querySelectorAll(`.${HOVERED_CLASS}`)
        .forEach((el) => el.classList.remove(HOVERED_CLASS));
}

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

    const textHtml = groupTokenComponentToString(new GroupToken(origTokens));
    const htmlValueRef = useRef(textHtml);
    
    const ref = useRef<HTMLPreElement>(null);

    useMutations(ref, (node) => removeErrorForAllParents(ref.current, node));

    const removeHovers = useCallback(() => removeHoverClasses(ref.current), [ref]);

    const onMouseMove = useCallback((e: FormEvent<HTMLSpanElement>) => {
        removeHoverClasses(ref.current);
        addHoverToNearestError(ref.current, e.target as HTMLSpanElement);
    }, [ref]);

    return (
        <div className="edit-result">
            <pre contentEditable
                className="edit-result__text"  
                ref={ref} 
                onMouseMove={onMouseMove}
                onMouseLeave={removeHovers}
                dangerouslySetInnerHTML={{ __html: htmlValueRef.current }}
            />

            <div className="edit-result__buttons-bar">
                <button>Применить</button>
                <button>Пропустить</button>
            </div>
        </div>
    );
}
