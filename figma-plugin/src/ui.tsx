import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/App';
import { StartPluginMessage, PluginMessageType, PluginMessageWrapper, PluginMessage, UpdateNodeTextMessage, NodeDto, NavigateToNodePluginMessage } from './common/PluginMessage';
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

window.onmessage = (msgEvent: MessageEvent<PluginMessageWrapper>) => {
    const msg = msgEvent.data.pluginMessage;

    switch (msg.type) {
        case PluginMessageType.StartPlugin:
            ReactDOM.render(
                <App 
                    startPluginMessage={msg as StartPluginMessage} 
                    onNodeEditResult={onNodeEditResult}
                    navigateToNode={navigateToNode}
                />, 
                document.getElementById('react-page'));
            break;
        default:
            console.error(`Unknown msg type: ${msg.type}`);
    }
};
