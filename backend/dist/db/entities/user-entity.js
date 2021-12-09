"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const ydb_sdk_1 = require("ydb-sdk");
var Type = ydb_sdk_1.Ydb.Type;
class UserEntity extends ydb_sdk_1.TypedData {
    constructor(data) {
        super(data);
        this.id = data.id;
        this.name = data.name;
        this.avatarUrl = data.avatarUrl;
        this.email = data.email;
        this.origin = data.origin;
        this.originId = data.originId;
        this.isAdmin = data.isAdmin;
        this.isDeleted = data.isDeleted;
    }
    getTypedValue(prop) {
        return super.getTypedValue(prop);
    }
    static getTypedId(id) {
        const fakeUserEntity = new UserEntity({ id });
        return fakeUserEntity.getTypedValue('id');
    }
    static getTypedOriginId(originId) {
        const fakeUserEntity = new UserEntity({ originId });
        return fakeUserEntity.getTypedValue('originId');
    }
}
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], UserEntity.prototype, "avatarUrl", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], UserEntity.prototype, "origin", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], UserEntity.prototype, "originId", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.BOOL })
], UserEntity.prototype, "isAdmin", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.BOOL })
], UserEntity.prototype, "isDeleted", void 0);
exports.UserEntity = UserEntity;
