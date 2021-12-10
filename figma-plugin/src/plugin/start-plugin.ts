import { getSelectedTextNodes } from "./get-selected-text-nodes";
import { NodeDto, PluginMessageType, StartPluginMessage } from "../common/PluginMessage";

export function startPlugin () {
    const nodes = getSelectedTextNodes(figma.currentPage.selection);

    const nodeDtos = nodes.map((node): NodeDto => ({ 
        nodeId: node.id, 
        text: node.characters,
    }));

    const startMsg: StartPluginMessage = { 
        type: PluginMessageType.StartPlugin,
        selectedNodes: nodeDtos,
    };

    figma.ui.postMessage(startMsg);
}
