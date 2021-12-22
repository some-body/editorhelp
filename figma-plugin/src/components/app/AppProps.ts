import { NodeDto, StartPluginMessage } from "../../common/PluginMessage";
import { ApplyTextChangesHandler } from "../edit-result-page/EditResultPageProps";

export interface AppProps {
    startPluginMessage: StartPluginMessage;
    onNodeEditResult: ApplyTextChangesHandler;
    navigateToNode: (nodeDto: NodeDto) => void;
}
