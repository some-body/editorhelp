export type PluginMessage = StartPluginMessage;

export enum PluginMessageType { StartPlugin }

interface PluginMessageBase {
    type: PluginMessageType;
}

export interface StartPluginMessage extends PluginMessageBase {
    type: PluginMessageType.StartPlugin;
    selectedNodes: NodeDto[];
}

interface NodeDto {
    nodeId: string;
    text: string;
}
