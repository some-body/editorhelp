import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/App';
import { StartPluginMessage, PluginMessageType, PluginMessageWrapper, PluginMessage, UpdateNodeTextMessage, NodeDto, NavigateToNodePluginMessage, RequestSelectedNodesPluginMessage } from './common/PluginMessage';
import { TextEditResult } from './entities/EditResult';
import './ui.css';

function sendMessage (msg: PluginMessage) {
    parent.postMessage({ pluginMessage: msg }, '*');
}

function onNodeEditResult (editResult: TextEditResult, text: string) {
    const msg: UpdateNodeTextMessage = {
        type: PluginMessageType.UpdateNode,
        node: editResult.node,
        newText: text,
    };
    sendMessage(msg);
}

function navigateToNode (node: NodeDto) {
    const msg: NavigateToNodePluginMessage = {
        type: PluginMessageType.NavigateToNode,
        node,
    };
    sendMessage(msg);
}

function getSelectedNodes (): Promise<NodeDto[]> {
    return new Promise((res) => {
        window.addEventListener('message', (msgEvent: MessageEvent<PluginMessageWrapper>) => {
            const msg = msgEvent.data.pluginMessage;
            if (msg.type !== PluginMessageType.ResponseSelectedNodes) {
                return;
            }
            res(msg.selectedNodes);
        });
        
        const reqMsg: RequestSelectedNodesPluginMessage = {
            type: PluginMessageType.RequestSelectedNodes,
        };
        sendMessage(reqMsg);
    });
}

window.onmessage = (msgEvent: MessageEvent<PluginMessageWrapper>) => {
    const msg = msgEvent.data.pluginMessage;

    switch (msg.type) {
        case PluginMessageType.StartPlugin:
            ReactDOM.render(
                <App 
                    startPluginMessage={msg as StartPluginMessage} 
                    onNodeEditResult={onNodeEditResult}
                    navigateToNode={navigateToNode}
                    getSelectedNodes={getSelectedNodes}
                />, 
                document.getElementById('react-page'));
            break;
        default:
            // ignore.
    }
};
