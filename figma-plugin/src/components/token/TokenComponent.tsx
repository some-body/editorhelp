import React, { FormEventHandler, useCallback, useRef, useState } from 'react';
import { GroupToken, TextToken, Token, TokenError, TokenType } from '../../services/Tokenizator';
import { GroupTokenComponentProps, TextTokenComponentProps } from './TokenComponentProps';
import './TokenComponent.css';
import { Suggest } from '../../entities/EditResultDto';
import { SuggestsPopup } from '../suggests-popup/SuggestsPopup';

export function TextTokenComponent (
    { token, onChange }: TextTokenComponentProps,
) {
    const defaultValue = useRef(token.text);

    const setNewText: FormEventHandler<HTMLSpanElement> = useCallback((e) => {
        const newText = (e.target as HTMLSpanElement).textContent;
        token.text = newText;
        onChange()
    }, []);

    return (
        <span 
            className="token token_type_text" 
            contentEditable
            onInput={setNewText} 
            dangerouslySetInnerHTML={{ __html: defaultValue.current }}
        />
    );
}

const emptyFun = () => {};

export function GroupTokenComponent (
    { token: origToken, onChange = emptyFun, onHovered = emptyFun }: GroupTokenComponentProps,
) {
    const [token, setToken] = useState(origToken);
    const [shouldShowSuggest, setShouldShowSuggest] = useState(false);

    const onChildrenChange = () => {
        origToken.error = undefined;
        setToken({ ...token });
        setShouldShowSuggest(false);
        onChange();
    };

    const [hovered, setHovered] = useState(false)

    const enableHover: FormEventHandler = (e) => {
        setHovered(true);
        e.stopPropagation();

        if (!hovered) {
            onHovered();
        }
    };

    const disableHover = () => {
        setHovered(false);
    };

    const showSuggest: FormEventHandler = useCallback((e) => {
        setShouldShowSuggest(true);
        e.stopPropagation();
    }, []);

    const hideSuggest = useCallback(() => setShouldShowSuggest(false), []);

    const onSuggestItemClick = useCallback((suggest: Suggest) => {
        setShouldShowSuggest(false);
        // onSuggestClick(suggest);
    }, []);

    if (!token.error) {
        return (<>{token.tokens.map((token) => renderToken(token, onChildrenChange, disableHover))}</>);
    }

    const { suggests } = token.error;

    let suggestElem: JSX.Element = null;
    if (shouldShowSuggest && suggests.length > 0) {
        suggestElem = (
            <SuggestsPopup 
                suggests={suggests} 
                onClickOutside={hideSuggest}
                onSuggestClick={onSuggestItemClick}
            />
        );
    }

    const hoveredTitle = hovered ? 'hovered' : '';

    return (
        <span
            className={`token token_type_error ${hoveredTitle}`} 
            onClick={showSuggest}
            onMouseMove={enableHover}
            onMouseLeave={disableHover}
        >
            {token.tokens.map((token) => renderToken(token, onChildrenChange, disableHover))}
            {suggestElem}
        </span>
    );
}

function renderToken(token: Token, onChange: () => void, onChildGroupHovered: () => void): JSX.Element {
    switch (token.type) {
        case TokenType.Text: 
            return (
                <TextTokenComponent 
                    token={token as TextToken} 
                    onChange={onChange} 
                />
            );
        case TokenType.Group: 
            return (
                <GroupTokenComponent 
                    token={token as GroupToken} 
                    onChange={onChange}
                    onHovered={onChildGroupHovered}
                />
            );
        default:
            return null;
    }
}


// export function GroupTokenComponent (
//     { children, onTextChange }: ErrorTokenComponentProps,
// ) {
//     const defaultValue = useRef(token.text);

//     const setNewText: FormEventHandler<HTMLSpanElement> = useCallback(
//         (e) => onTextChange(token, (e.target as HTMLSpanElement).textContent), 
//     [],);

//     return (
//         <span 
//             className="token token_type_error" 
//             contentEditable
//             onInput={setNewText} 
//             dangerouslySetInnerHTML={{ __html: defaultValue.current }}
//         />
//     );
// }

// export function TokenComponent (
//     { token, onSuggestClick }: TextTokenComponentProps2,
// ): JSX.Element {
//     const [errCode, setErrCode] = useState(token.errorCode);

//     const dropError = useCallback(() => setErrCode(undefined), []);

//     const [shouldShowSuggest, setShouldShowSuggest] = useState(false);
//     const showSuggest = useCallback(() => setShouldShowSuggest(true), []);
//     const hideSuggest = useCallback(() => setShouldShowSuggest(false), []);
//     const onSuggestItemClick = useCallback((suggest: Suggest) => {
//         setShouldShowSuggest(false);
//         onSuggestClick(suggest);
//     }, []);

//     if (!errCode) {
//         return (
//             <span className="token token_type_text" contentEditable>
//                 {getContent(token)}
//             </span>
//         );
//     }

//     const { suggests } = token as ErrorToken;
//     let suggestElem: JSX.Element = null;
//     if (shouldShowSuggest && suggests.length > 0) {
//         suggestElem = (
//             <SuggestsPopup 
//                 suggests={suggests} 
//                 onClickOutside={hideSuggest}
//                 onSuggestClick={onSuggestItemClick}
//             />
//         );
//     }

//     return (
//         <span
//             contentEditable
//             className="token token_type_error"
//             onClick={showSuggest}
//             onInput={dropError}
//         >
//             {getContent(token)}
//             {suggestElem}
//         </span>
//     );
// }

// function getContent(token: Token) {
//     if (token instanceof TextToken) {
//         return token.text;
//     } if (token instanceof ErrorToken) {
//         return token.text;
//     } else if (token instanceof GroupToken) {
//         return token.tokens.map((t) => <TokenComponent token={t} />)
//     }
// }
