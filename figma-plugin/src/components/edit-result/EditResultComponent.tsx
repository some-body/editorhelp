import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GroupToken, TextToken, TokenError, Tokenizator } from '../../services/Tokenizator';
import { EditResultComponentProps } from './EditResultComponentProps';
import { ERROR_DATA_ATTR, groupTokenComponentToString } from '../token/TokenComponent';
import { useMutations } from '../../hooks/use-mutations';
import { addHoverToNearestError, getNearestParentError, removeErrorForAllParents, removeHoverClasses } from './token-elements-operations';
import { SuggestsPopup } from '../suggests-popup/SuggestsPopup';
import { Suggest } from '../../entities/EditResultDto';
import './EditResultComponent.css';

const tokenizator = new Tokenizator();

export function EditResultComponent (
    { editResult, onNextClick }: EditResultComponentProps,
): JSX.Element {
    // TODO: Попросить отнавигироваться к нужной штуке.

    const origTokens = useMemo(() => tokenizator.tokenize(editResult), [editResult]);

    const textHtml = useMemo(() => groupTokenComponentToString(new GroupToken(origTokens)), [origTokens]);

    const ref = useRef<HTMLPreElement>(null);

    const [suggestTarget, setSuggestTarget] = useState<HTMLElement>(undefined);

    useMutations(ref, (node) => {
        setSuggestTarget(undefined);
        removeErrorForAllParents(ref.current, node);
    });

    const removeHovers = useCallback(() => removeHoverClasses(ref.current), [ref]);

    const onMouseMove = useCallback((e: FormEvent<HTMLSpanElement>) => {
        removeHoverClasses(ref.current);
        addHoverToNearestError(ref.current, e.target as HTMLSpanElement);
    }, [ref]);

    const onClick = useCallback((e) => {
        const errNode = getNearestParentError(ref.current, e.target);
        setSuggestTarget(errNode);
    }, [ref]);

    const onSuggestClick = useCallback((s: Suggest) => {
        suggestTarget.textContent = s.value;
        removeErrorForAllParents(ref.current, suggestTarget);
        setSuggestTarget(undefined);
    }, [ref, suggestTarget]);

    const onClickOutside = () => setSuggestTarget(undefined);

    return (
        <div className="edit-result">
            <pre contentEditable
                className="edit-result__text"  
                ref={ref} 
                onMouseMove={onMouseMove}
                onMouseLeave={removeHovers}
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: textHtml }}
            />

            {renderSuggest(suggestTarget, onSuggestClick, onClickOutside)}

            <div className="edit-result__buttons-bar">
                <button>Применить</button>
                <button onClick={onNextClick}>Пропустить</button>
            </div>
        </div>
    );
}

function renderSuggest (
    target: HTMLElement | undefined,
    onSuggestClick: (Suggest) => void,
    onClickOutside: () => void,
): JSX.Element | undefined {

    if (!target) {
        return undefined;
    }

    const error = JSON.parse(target.getAttribute(ERROR_DATA_ATTR));
    if (!error) {
        return undefined;
    }

    const rect = target.getBoundingClientRect();

    return (
        <SuggestsPopup
            suggests={error.suggests}
            onSuggestClick={onSuggestClick}
            onClickOutside={onClickOutside}
            position={{ 
                top: rect.y + rect.height, 
                left: rect.x,
            }}
        />
    );
}
