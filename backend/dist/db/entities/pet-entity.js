"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetEntity = exports.PetGender = exports.PetType = void 0;
const ydb_sdk_1 = require("ydb-sdk");
var Type = ydb_sdk_1.Ydb.Type;
var PetType;
(function (PetType) {
    PetType[PetType["Dog"] = 1] = "Dog";
    PetType[PetType["Cat"] = 2] = "Cat";
})(PetType = exports.PetType || (exports.PetType = {}));
var PetGender;
(function (PetGender) {
    PetGender[PetGender["Unknown"] = 0] = "Unknown";
    PetGender[PetGender["Male"] = 1] = "Male";
    PetGender[PetGender["Female"] = 2] = "Female";
})(PetGender = exports.PetGender || (exports.PetGender = {}));
class PetEntity extends ydb_sdk_1.TypedData {
    constructor(data) {
        super(data);
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.breed = data.breed;
        this.colorDescription = data.colorDescription;
        this.gender = data.gender;
        this.birthTimestampMs = data.birthTimestampMs;
        this.description = data.description;
        this.photoIdsJsonArray = data.photoIdsJsonArray;
        this.ownerId = data.ownerId;
        this.isDeleted = data.isDeleted;
    }
    getTypedValue(prop) {
        return super.getTypedValue(prop);
    }
    static getTypedId(id) {
        const fakeEntity = new PetEntity({ id });
        return fakeEntity.getTypedValue('id');
    }
}
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "id", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "name", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UINT8 })
], PetEntity.prototype, "type", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "breed", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "colorDescription", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UINT8 })
], PetEntity.prototype, "gender", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UINT64 })
], PetEntity.prototype, "birthTimestampMs", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "description", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "photoIdsJsonArray", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], PetEntity.prototype, "ownerId", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.BOOL })
], PetEntity.prototype, "isDeleted", void 0);
exports.PetEntity = PetEntity;
