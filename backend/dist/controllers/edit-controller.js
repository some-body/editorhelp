"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditController = void 0;
const api_controller_1 = require("./api-controller");
const edit_input_dto_1 = require("./dto/edit-input-dto");
class EditController extends api_controller_1.ApiController {
    constructor(spellCheck, spellCheckApplyer) {
        super("/edit");
        this.spellCheck = spellCheck;
        this.spellCheckApplyer = spellCheckApplyer;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = (0, edit_input_dto_1.parseEditInputDto)(req.body);
            if (!input) {
                res.sendStatus(400);
                return;
            }
            const checkResult = yield this.spellCheck.checkTexts(input.texts);
            const editedTexts = this.spellCheckApplyer.applySpellCheckResult(input.texts, checkResult);
            const output = { editedTexts };
            res.send(output);
        });
    }
}
exports.EditController = EditController;
