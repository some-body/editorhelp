"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostieEntity = exports.LostieStatus = void 0;
const ydb_sdk_1 = require("ydb-sdk");
var Type = ydb_sdk_1.Ydb.Type;
var LostieStatus;
(function (LostieStatus) {
    LostieStatus[LostieStatus["Unknown"] = 0] = "Unknown";
    LostieStatus[LostieStatus["Searching"] = 1] = "Searching";
    LostieStatus[LostieStatus["FoundAlive"] = 2] = "FoundAlive";
    LostieStatus[LostieStatus["Closed"] = 3] = "Closed";
    LostieStatus[LostieStatus["Deprecated"] = 4] = "Deprecated";
})(LostieStatus = exports.LostieStatus || (exports.LostieStatus = {}));
class LostieEntity extends ydb_sdk_1.TypedData {
    constructor(data) {
        super(data);
        this.id = data.id;
        this.description = data.description;
        this.contactsDescription = data.contactsDescription;
        this.petId = data.petId;
        this.status = data.status;
        this.createdTimestampMs = data.createdTimestampMs;
        this.lastUpdateTimestampMs = data.lastUpdateTimestampMs;
        this.creatorId = data.creatorId;
        this.isDeleted = data.isDeleted;
    }
    getTypedValue(prop) {
        return super.getTypedValue(prop);
    }
    static getTypedId(id) {
        const fakeEntity = new LostieEntity({ id });
        return fakeEntity.getTypedValue('id');
    }
}
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], LostieEntity.prototype, "id", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], LostieEntity.prototype, "description", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], LostieEntity.prototype, "contactsDescription", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], LostieEntity.prototype, "petId", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UINT8 })
], LostieEntity.prototype, "status", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UINT64 })
], LostieEntity.prototype, "createdTimestampMs", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UINT64 })
], LostieEntity.prototype, "lastUpdateTimestampMs", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.UTF8 })
], LostieEntity.prototype, "creatorId", void 0);
__decorate([
    (0, ydb_sdk_1.declareType)({ typeId: Type.PrimitiveTypeId.BOOL })
], LostieEntity.prototype, "isDeleted", void 0);
exports.LostieEntity = LostieEntity;
