import { NodeDto } from "../common/PluginMessage";

export async function navigateToNode (nodeDto: NodeDto) {
    const node = figma.getNodeById(nodeDto.nodeId) as TextNode | null;

    if (!node) {
        return;
    }

    figma.viewport.scrollAndZoomIntoView([node]);
    figma.currentPage.selection = [node];
}
