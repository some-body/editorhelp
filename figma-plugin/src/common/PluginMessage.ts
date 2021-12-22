export interface PluginMessageWrapper {
    pluginMessage: PluginMessage;
}

export type PluginMessage = StartPluginMessage 
    | UpdateNodeTextMessage 
    | NavigateToNodePluginMessage 
    | RequestSelectedNodesPluginMessage
    | ResponseSelectedNodesPluginMessage
    | CloseMessage;

export enum PluginMessageType { 
    StartPlugin, UpdateNode, NavigateToNode, RequestSelectedNodes, ResponseSelectedNodes, ClosePlugin,
}

interface PluginMessageBase {
    type: PluginMessageType;
}

export interface StartPluginMessage extends PluginMessageBase {
    type: PluginMessageType.StartPlugin;
}

export interface RequestSelectedNodesPluginMessage extends PluginMessageBase {
    type: PluginMessageType.RequestSelectedNodes;
}

export interface ResponseSelectedNodesPluginMessage extends PluginMessageBase {
    type: PluginMessageType.ResponseSelectedNodes;
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
