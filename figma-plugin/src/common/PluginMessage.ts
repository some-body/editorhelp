export interface PluginMessageWrapper {
    pluginMessage: PluginMessage;
}

export type PluginMessage = StartPluginMessage 
    | UpdateNodeTextMessage 
    | NavigateToNodePluginMessage 
    | CloseMessage;

export enum PluginMessageType { StartPlugin, UpdateNode, NavigateToNode, ClosePlugin }

interface PluginMessageBase {
    type: PluginMessageType;
}

export interface StartPluginMessage extends PluginMessageBase {
    type: PluginMessageType.StartPlugin;
    selectedNodes: NodeDto[];
}

export interface NavigateToNodePluginMessage extends PluginMessageBase {
    type: PluginMessageType.NavigateToNode;
    node: NodeDto;
}

export interface UpdateNodeTextMessage extends PluginMessageBase {
    type: PluginMessageType.UpdateNode;
    node: NodeDto;
    newText: string;
}

export interface CloseMessage extends PluginMessageBase {
    type: PluginMessageType.ClosePlugin;
}

export interface NodeDto {
    nodeId: string;
    text: string;
}
