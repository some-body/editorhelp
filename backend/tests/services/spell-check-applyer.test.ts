import { SpellCheckApplyer } from "../../src/services/spell-check-applyer";
import { SpellCheckError } from "../../src/services/spell-check-error";

describe('SpellCheckApplyer', () => {
    const spellCheckApplyer = new SpellCheckApplyer();

    test('replaces substring with first suggested', () => {
        const text = 'привет питер';
        const spellCheckError: SpellCheckError = {
            pos: 7,
            len: 2,
            s: ['пот'],
        };
    
        const correctedText = spellCheckApplyer.applySpellCheckResult([text], [[spellCheckError]]);
    
        expect(correctedText[0]).toBe('привет поттер');
    });

    test('corrects синхрафазатрон', () => {
        const text = 'синхрафазатрон';
        const spellCheckError: SpellCheckError = {
            pos: 0,
            len: 14,
            s: ['синхрофазотрон'],
        };

        const correctedText = spellCheckApplyer.applySpellCheckResult([text], [[spellCheckError]]);
    
        expect(correctedText[0]).toBe('синхрофазотрон');
    });
});
