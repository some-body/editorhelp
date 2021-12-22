import { NodeDto, PluginMessageType, ResponseSelectedNodesPluginMessage } from "../common/PluginMessage";
import { getSelectedTextNodes } from "./get-selected-text-nodes";

export function sendSelectedNodes () {
    const selection = figma.currentPage.selection;
    const nodesToProcess = selection.length > 0 ? selection : figma.currentPage.children;

    const nodes = getSelectedTextNodes(nodesToProcess);

    const nodeDtos = nodes.map((node): NodeDto => ({ 
        nodeId: node.id, 
        text: node.characters,
    }));

    const respMsg: ResponseSelectedNodesPluginMessage = { 
        type: PluginMessageType.ResponseSelectedNodes,
        selectedNodes: nodeDtos,
    };

    figma.ui.postMessage(respMsg);
}