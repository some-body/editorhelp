import { PluginMessage, PluginMessageType } from "./common/PluginMessage";
import { showPluginUi } from "./plugin/show-plugin-ui";
import { startPlugin } from "./plugin/start-plugin";
import { updatetNode } from "./plugin/update-node";

figma.ui.onmessage = (msg: PluginMessage) => {
    switch (msg.type) {
        case PluginMessageType.ClosePlugin:
            figma.closePlugin();
            break;

        case PluginMessageType.UpdateNode:
            updatetNode(msg.node, msg.newText);
            break;

        default: 
            // ignore.
    }
};

showPluginUi();

startPlugin();
