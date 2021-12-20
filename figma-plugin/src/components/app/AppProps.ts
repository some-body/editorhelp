import { StartPluginMessage } from "../../common/PluginMessage";
import { ApplyTextChangesHandler } from "../edit-result/EditResultComponentProps";

export interface AppProps {
    startPluginMessage: StartPluginMessage;
    onNodeEditResult: ApplyTextChangesHandler;
}
