import { Request, Response } from "express";
import { SpellCheckApplyer } from "../services/spell-check-applyer";
import { SpellCheck } from "../services/spellcheck";
import { ApiController } from "./api-controller";
import { parseEditInputDto } from "./dto/edit-input-dto";
import { EditOutputDto } from "./dto/edit-output-dto";

export class EditController extends ApiController {

    private spellCheck: SpellCheck;
    private spellCheckApplyer: SpellCheckApplyer;

    constructor(spellCheck: SpellCheck, spellCheckApplyer: SpellCheckApplyer) {
        super("/edit");

        this.spellCheck = spellCheck;
        this.spellCheckApplyer = spellCheckApplyer;
    }

    override async post (req: Request, res: Response): Promise<void> {
        const input = parseEditInputDto(req.body);
        if (!input) {
            res.sendStatus(400);
            return;
        }

        const checkResult = await this.spellCheck.checkTexts(input.texts);

        const editedTexts = this.spellCheckApplyer.applySpellCheckResult(input.texts, checkResult);

        const output: EditOutputDto = { editedTexts };
        res.send(output)
    }
}
