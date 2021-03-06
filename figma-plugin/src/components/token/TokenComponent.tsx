import React from 'react';
import { GroupToken, TextToken, Token, TokenType } from '../../services/Tokenizator';
import { GroupTokenComponentProps, TextTokenComponentProps } from './TokenComponentProps';
import ReactDOMServer from 'react-dom/server';
import './TokenComponent.css';

export const ERROR_CLASS = 'token_type_error';
export const ERROR_DATA_ATTR = 'data-error';

export function groupTokenComponentToString (token: GroupToken): string {
    return ReactDOMServer.renderToString(<GroupTokenComponent token={token} />);
}

export function TextTokenComponent (
    { token }: TextTokenComponentProps,
): JSX.Element {
    return (
        <span className="token token_type_text">{token.text}</span>
    );
}

export function GroupTokenComponent (
    { token }: GroupTokenComponentProps,
) {
    const suggestsCount = token.error?.suggests?.length || 0;
    const clickableClassName = suggestsCount > 0 ? 'clickable' : '';

    const errorClassName = token.error ? ERROR_CLASS : '';

    return (
        <span 
            className={`token ${errorClassName} ${clickableClassName}`} 
            title={token.error?.errorTitle} 
            data-error={JSON.stringify(token.error)}
        >
            {token.tokens.map((t) => renderToken(t))}
        </span>
    );
}

function renderToken(
    token: Token, 
): JSX.Element {
    switch (token.type) {
        case TokenType.Text: 
            return (
                <TextTokenComponent token={token as TextToken} />
            );
        case TokenType.Group: 
            return (
                <GroupTokenComponent token={token as GroupToken} />
            );
        default:
            return null;
    }
}
