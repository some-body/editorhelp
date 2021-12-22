import { getSelectedTextNodes } from "./get-selected-text-nodes";
import { NodeDto, PluginMessageType, StartPluginMessage } from "../common/PluginMessage";

export function startPlugin () {
    const startMsg: StartPluginMessage = { 
        type: PluginMessageType.StartPlugin,
    };

    figma.ui.postMessage(startMsg);
}
