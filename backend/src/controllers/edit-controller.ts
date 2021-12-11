import { Request, Response } from "express";
import { SpellCheck } from "../services/spellcheck";
import { ApiController } from "./api-controller";
import { parseEditInputDto } from "./dto/edit-input-dto";
import { EditError, EditResultDto, Suggest, TextEditResult } from "./dto/edit-result-dto";

export class EditController extends ApiController {

    private spellCheck: SpellCheck;

    constructor(spellCheck: SpellCheck) {
        super("/edit");

        this.spellCheck = spellCheck;
    }

    override async post (req: Request, res: Response): Promise<void> {
        const input = parseEditInputDto(req.body);
        if (!input) {
            res.sendStatus(400);
            return;
        }

        const checkResults = await this.spellCheck.checkTexts(input.texts);

        const output: EditResultDto = {
            textEditResults: checkResults.map((checkRes): TextEditResult => ({
                errors: checkRes.map((err): EditError => ({
                    pos: err.pos,
                    len: err.len,
                    code: 'SPELLING_ERROR',
                    title: 'Ошибка (наверное)',
                    suggests: err.s.map((yaSuggest): Suggest => ({
                        title: yaSuggest,
                        value: yaSuggest,
                    })),
                })),
            })),
        };
        res.send(output)
    }
}
