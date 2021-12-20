import { NodeDto } from "../common/PluginMessage";
import { TextEditResultDto } from "./EditResultDto";

export interface TextEditResult extends TextEditResultDto {
    originalText: string;
    node: NodeDto;
}

export interface EditResult {
    textEditResults: TextEditResult[];
}
