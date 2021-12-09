import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/App';
import { StartPluginMessage, PluginMessage, PluginMessageType } from './entities/PluginMessage';
import './ui.css';

figma.ui.onmessage = (msg: PluginMessage) => {
    switch (msg.type) {
        case PluginMessageType.StartPlugin:
            ReactDOM.render(<App startPluginMessage={msg as StartPluginMessage} />, document.getElementById('react-page'));
            break;
        default:
            console.error(`Unknown msg: ${msg}`);
    }
};
