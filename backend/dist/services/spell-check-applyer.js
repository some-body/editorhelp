"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpellCheckApplyer = void 0;
class SpellCheckApplyer {
    applySpellCheckResult(texts, spellChecks) {
        return texts.map((text, i) => {
            return this.applyErrors(text, spellChecks[i]);
        });
    }
    applyErrors(text, errors) {
        return errors.reduce((res, error) => {
            const substitute = error.s[0];
            if (!substitute) {
                return res;
            }
            const start = res.substr(0, error.pos);
            const end = res.substr(error.pos + error.len);
            return `${start}${substitute}${end}`;
        }, text);
    }
}
exports.SpellCheckApplyer = SpellCheckApplyer;
