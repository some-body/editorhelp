import { EditResultDto } from "../entities/EditResultDto";
import { StartPluginMessage } from "../common/PluginMessage";
import { Backend } from "./backend";

export class Editor {

    private backend: Backend;

    constructor(backend: Backend) {
        this.backend = backend;
    }

    async getEditResult(editRequest: StartPluginMessage): Promise<EditResultDto> {
        const { selectedNodes } = editRequest;

        const texts = selectedNodes.map((node) => node.text);

        return await this.backend.edit(texts);
    }
}
