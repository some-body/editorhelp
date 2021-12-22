import { NodeDto } from "../common/PluginMessage";
import { EditResult, TextEditResult } from "../entities/EditResult";
import { Backend } from "./backend";

export class Editor {

    private backend: Backend;

    constructor(backend: Backend) {
        this.backend = backend;
    }

    async getEditResult(selectedNodes: NodeDto[]): Promise<EditResult> {
        const texts = selectedNodes.map((node) => node.text);

        const dto = await this.backend.edit(texts);

        return {
            textEditResults: dto.textEditResults
                .map((res, i): TextEditResult => ({
                    node: selectedNodes[i],
                    originalText: selectedNodes[i].text,
                    errors: res.errors,
                }))
                .filter((res) => res.errors.length > 0),
        }
    }
}
