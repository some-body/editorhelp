import { getSelectedTextNodes } from "./get-selected-text-nodes";
import { NodeDto, PluginMessageType, StartPluginMessage } from "../common/PluginMessage";

export function startPlugin () {
    const selection = figma.currentPage.selection;
    const nodesToProcess = selection.length > 0 ? selection : figma.currentPage.children;

    const nodes = getSelectedTextNodes(nodesToProcess);

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
