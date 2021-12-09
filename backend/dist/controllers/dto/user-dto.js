"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDto = void 0;
function createUserDto(user) {
    return {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        email: user.email,
    };
}
exports.createUserDto = createUserDto;
