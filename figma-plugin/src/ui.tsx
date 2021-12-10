import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/App';
import { StartPluginMessage, PluginMessageType, PluginMessageWrapper } from './common/PluginMessage';
import './ui.css';

window.onmessage = (msgEvent: MessageEvent<PluginMessageWrapper>) => {
    const msg = msgEvent.data.pluginMessage;

    switch (msg.type) {
        case PluginMessageType.StartPlugin:
            ReactDOM.render(<App startPluginMessage={msg as StartPluginMessage} />, document.getElementById('react-page'));
            break;
        default:
            console.error(`Unknown msg type: ${msg.type}`);
    }
};
