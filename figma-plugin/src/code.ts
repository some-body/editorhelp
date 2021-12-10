import { showPluginUi } from "./plugin/show-plugin-ui";
import { startPlugin } from "./plugin/start-plugin";

figma.ui.onmessage = (msg: String) => {
    if (msg === 'close') {
      figma.closePlugin();
    }
};

showPluginUi();

startPlugin();
