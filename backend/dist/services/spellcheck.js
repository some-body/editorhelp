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
exports.SpellCheck = void 0;
const { checkTexts } = require('yandex-speller');
class SpellCheck {
    checkTexts(texts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.checkTextBatch(texts);
        });
    }
    checkTextBatch(texts) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                checkTexts(texts, (err, result) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    if (!Array.isArray(result)) {
                        rej(Error('Unsupported spellcheck result format.'));
                        return;
                    }
                    res(result);
                });
            });
        });
    }
}
exports.SpellCheck = SpellCheck;
