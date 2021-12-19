import { Suggest } from "../../entities/EditResultDto";
import { GroupToken, TextToken, Token, TokenType } from "../../services/Tokenizator";

export type ChangeHandler = () => void;

export interface TextTokenComponentProps {
    token: TextToken;
}

export interface GroupTokenComponentProps {
    token: GroupToken;
}
