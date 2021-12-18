import { Suggest } from "../../entities/EditResultDto";
import { GroupToken, TextToken, Token, TokenType } from "../../services/Tokenizator";

export interface TextTokenComponentProps2 {
    token: Token;
    onSuggestClick?: (suggest: Suggest) => void;
}

export type ChangeHandler = () => void;

export interface TextTokenComponentProps {
    token: TextToken;
    onChange: ChangeHandler;
}

export interface GroupTokenComponentProps {
    token: GroupToken;
    onChange?: ChangeHandler;
    onHovered?: () => void;
}
