import { PluginMessage, PluginMessageType } from "./common/PluginMessage";
import { navigateToNode } from "./plugin/navigate-to-node";
import { sendSelectedNodes } from "./plugin/send-selected-nodes";
import { showPluginUi } from "./plugin/show-plugin-ui";
import { startPlugin } from "./plugin/start-plugin";
import { updateNode } from "./plugin/update-node";

figma.ui.onmessage = (msg: PluginMessage) => {
    switch (msg.type) {
        case PluginMessageType.ClosePlugin:
            figma.closePlugin();
            break;

        case PluginMessageType.UpdateNode:
            updateNode(msg.node, msg.newText);
            break;

        case PluginMessageType.NavigateToNode:
            navigateToNode(msg.node);
            break;

        case PluginMessageType.RequestSelectedNodes:
            sendSelectedNodes();
            break;

        default: 
            // ignore.
    }
};

showPluginUi();

startPlugin();
