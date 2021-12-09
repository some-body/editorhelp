import { SpellCheckError } from "../entities/spell-check-error";

export class SpellCheckApplyer {
    
    applySpellCheckResult (texts: string[], spellChecks: SpellCheckError[][]): string[] {
        return texts.map((text, i) => {
            return this.applyErrors(text, spellChecks[i]);
        });
    }

    private applyErrors (text: string, errors: SpellCheckError[]): string {
        return errors.reduce((res: string, error: SpellCheckError) => {
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
