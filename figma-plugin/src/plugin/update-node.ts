import { NodeDto } from "../common/PluginMessage";

const loadedFonts = new Set();

export async function updateNode (nodeDto: NodeDto, text: string) {
    const node = figma.getNodeById(nodeDto.nodeId) as TextNode | null;

    if (node) {
        await loadFontIfNeeded(node.fontName);
        node.characters = text;
    }

    figma.viewport.scrollAndZoomIntoView([node]);
    figma.currentPage.selection = [node];
}

async function loadFontIfNeeded(fontName: FontName | PluginAPI['mixed']) {
    if (fontName === figma.mixed || loadedFonts.has(fontName)) {
        return;
    }

    await figma.loadFontAsync(fontName);
    loadedFonts.add(fontName);
}
