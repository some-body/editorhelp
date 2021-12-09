"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEditInputDto = void 0;
function parseEditInputDto(json) {
    const texts = json['texts'];
    if (!Array.isArray(texts)) {
        return undefined;
    }
    return { texts };
}
exports.parseEditInputDto = parseEditInputDto;
