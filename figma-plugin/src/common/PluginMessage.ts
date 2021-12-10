export interface PluginMessageWrapper {
    pluginMessage: PluginMessage;
}

export type PluginMessage = StartPluginMessage;

export enum PluginMessageType { StartPlugin }

interface PluginMessageBase {
    type: PluginMessageType;
}

export interface StartPluginMessage extends PluginMessageBase {
    type: PluginMessageType.StartPlugin;
    selectedNodes: NodeDto[];
}

export interface NodeDto {
    nodeId: string;
    text: string;
}