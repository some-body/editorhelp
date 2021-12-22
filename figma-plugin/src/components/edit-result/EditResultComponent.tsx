import React, { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { GroupToken, Tokenizator } from '../../services/Tokenizator';
import { EditResultComponentProps } from './EditResultComponentProps';
import { ERROR_DATA_ATTR, groupTokenComponentToString } from '../token/TokenComponent';
import { useMutations } from '../../hooks/use-mutations';
import { addHoverToNearestError, getNearestParentError, removeErrorForAllParents, removeHoverClasses } from './token-elements-operations';
import { SuggestsPopup } from '../suggests-popup/SuggestsPopup';
import { Suggest } from '../../entities/EditResultDto';
import './EditResultComponent.css';

const tokenizator = new Tokenizator();

export function EditResultComponent (
    { editResult, onUpdate, onApply, onNext, onPrev, initState, isModified }: EditResultComponentProps,
): JSX.Element {
    // TODO: Попросить отнавигироваться к нужной штуке.

    const origTokens = useMemo(() => tokenizator.tokenize(editResult), [editResult]);

    const textHtml = useMemo(() => {
        return initState?.html || groupTokenComponentToString(new GroupToken(origTokens));
    }, [origTokens, editResult]);

    const ref = useRef<HTMLPreElement>(null);

    const [suggestTarget, setSuggestTarget] = useState<HTMLElement>(undefined);

    useMutations(ref, (node) => {
        setSuggestTarget(undefined);
        removeErrorForAllParents(ref.current, node);
        onUpdate({ html: ref.current.innerHTML, text: ref.current.textContent });
    }, [onUpdate]);

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
        onUpdate({ html: ref.current.innerHTML, text: ref.current.textContent });
    }, [ref, suggestTarget, onUpdate]);

    const onClickOutside = useCallback(() => setSuggestTarget(undefined), []);

    const onCleanupClick = useCallback(() => {
        ref.current.innerHTML = groupTokenComponentToString(new GroupToken(origTokens));
        onUpdate({ html: ref.current.innerHTML, text: ref.current.textContent });
    }, [ref, origTokens]);

    const applyButtonClass = isModified ? 'click-me' : '';

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
                <button onClick={onPrev}>Предыдущий</button>
                <button onClick={onCleanupClick}>Сбросить</button>
                <button className={applyButtonClass} onClick={onApply}>Применить</button>
                <button onClick={onNext}>Следующий</button>
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
