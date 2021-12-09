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
exports.LostiesRepository = void 0;
const db_1 = require("./db");
const lostie_entity_1 = require("./entities/lostie-entity");
const uuid = require('uuid');
const LOSTIES_TABLE = 'Losties';
class LostiesRepository {
    createLostie(lostie) {
        return __awaiter(this, void 0, void 0, function* () {
            const executeQuery = yield (0, db_1.getQueryExecutor)();
            const generatedId = uuid.v4();
            const currentTime = Date.now();
            const lostieEntity = new lostie_entity_1.LostieEntity(Object.assign(Object.assign({}, lostie), { id: generatedId, isDeleted: false, createdTimestampMs: currentTime, lastUpdateTimestampMs: currentTime }));
            yield executeQuery(`
            DECLARE $id AS Utf8;
            DECLARE $description AS Utf8;
            DECLARE $contactsDescription AS Utf8;
            DECLARE $petId AS Utf8;
            DECLARE $status AS Uint8;
            DECLARE $createdTimestampMs AS Uint64;
            DECLARE $lastUpdateTimestampMs AS Uint64;
            DECLARE $creatorId AS Utf8;
            DECLARE $isDeleted AS Bool;

            UPSERT INTO ${LOSTIES_TABLE}
                (id, description, contacts_description, pet_id, status, created_timestamp_ms, last_update_timestamp_ms, creator_id, is_deleted)
            VALUES ($id, $description, $contactsDescription, $petId, $status, $createdTimestampMs, $lastUpdateTimestampMs, $creatorId, $isDeleted);
        `, {
                '$id': lostieEntity.getTypedValue('id'),
                '$description': lostieEntity.getTypedValue('description'),
                '$contactsDescription': lostieEntity.getTypedValue('contactsDescription'),
                '$petId': lostieEntity.getTypedValue('petId'),
                '$status': lostieEntity.getTypedValue('status'),
                '$createdTimestampMs': lostieEntity.getTypedValue('createdTimestampMs'),
                '$lastUpdateTimestampMs': lostieEntity.getTypedValue('lastUpdateTimestampMs'),
                '$creatorId': lostieEntity.getTypedValue('creatorId'),
                '$isDeleted': lostieEntity.getTypedValue('isDeleted'),
            });
            return yield this.getLostieById(generatedId);
        });
    }
    getLostieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getLostieBy({
                declarations: 'DECLARE $id AS Utf8',
                whereString: 'id = $id',
                queryParams: {
                    '$id': lostie_entity_1.LostieEntity.getTypedId(id),
                },
            });
        });
    }
    getLostieBy(requestParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { declarations, whereString, queryParams } = requestParams;
            const executeQuery = yield (0, db_1.getQueryExecutor)();
            const result = yield executeQuery(`
            ${declarations};
            SELECT id, description, contacts_description, pet_id, status, created_timestamp_ms, last_update_timestamp_ms, creator_id, is_deleted
            FROM ${LOSTIES_TABLE}
            WHERE is_deleted = false AND ${whereString};
        `, queryParams);
            const lostie = result && result[0];
            if (!lostie) {
                return undefined;
            }
            const createdTimestampMs = lostie['createdTimestampMs'];
            const lastUpdateTimestampMs = lostie['lastUpdateTimestampMs'];
            return {
                id: lostie['id'],
                description: lostie['description'],
                contactsDescription: lostie['contactsDescription'],
                petId: lostie['petId'],
                status: lostie['status'],
                createdTimestampMs: createdTimestampMs.toNumber(),
                lastUpdateTimestampMs: lastUpdateTimestampMs.toNumber(),
                creatorId: lostie['creatorId'],
                isDeleted: lostie['isDeleted'],
            };
        });
    }
}
exports.LostiesRepository = LostiesRepository;
