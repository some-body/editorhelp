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
exports.PetsRepository = void 0;
const db_1 = require("./db");
const pet_entity_1 = require("./entities/pet-entity");
const uuid = require('uuid');
const PETS_TABLE = 'Pets';
class PetsRepository {
    createPet(pet) {
        return __awaiter(this, void 0, void 0, function* () {
            const executeQuery = yield (0, db_1.getQueryExecutor)();
            const generatedId = uuid.v4();
            const petEntity = new pet_entity_1.PetEntity(Object.assign(Object.assign({}, pet), { id: generatedId, isDeleted: false }));
            yield executeQuery(`
            DECLARE $id AS Utf8;
            DECLARE $name AS Utf8;
            DECLARE $type AS Uint8;
            DECLARE $breed AS Utf8;
            DECLARE $colorDescription AS Utf8;
            DECLARE $gender AS Uint8;
            DECLARE $birthTimestampMs AS Uint64;
            DECLARE $description AS Utf8;
            DECLARE $photoIdsJsonArray AS Utf8;
            DECLARE $ownerId AS Utf8;
            DECLARE $isDeleted AS Bool;

            UPSERT INTO ${PETS_TABLE}
                (id, name, type, breed, color_description, gender, birth_timestamp_ms, description, photo_ids_json_array, owner_id, is_deleted)
            VALUES ($id, $name, $type, $breed, $colorDescription, $gender, $birthTimestampMs, $description, $photoIdsJsonArray, $ownerId, $isDeleted);
        `, {
                '$id': petEntity.getTypedValue('id'),
                '$name': petEntity.getTypedValue('name'),
                '$type': petEntity.getTypedValue('type'),
                '$breed': petEntity.getTypedValue('breed'),
                '$colorDescription': petEntity.getTypedValue('colorDescription'),
                '$gender': petEntity.getTypedValue('gender'),
                '$birthTimestampMs': petEntity.getTypedValue('birthTimestampMs'),
                '$description': petEntity.getTypedValue('description'),
                '$photoIdsJsonArray': petEntity.getTypedValue('photoIdsJsonArray'),
                '$ownerId': petEntity.getTypedValue('ownerId'),
                '$isDeleted': petEntity.getTypedValue('isDeleted'),
            });
            return yield this.getPetById(generatedId);
        });
    }
    getPetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getPetBy({
                declarations: 'DECLARE $id AS Utf8',
                whereString: 'id = $id',
                queryParams: {
                    '$id': pet_entity_1.PetEntity.getTypedId(id),
                },
            });
        });
    }
    getPetBy(requestParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { declarations, whereString, queryParams } = requestParams;
            const executeQuery = yield (0, db_1.getQueryExecutor)();
            const result = yield executeQuery(`
            ${declarations};
            SELECT id, name, type, breed, color_description, gender, birth_timestamp_ms, description, photo_ids_json_array, owner_id, is_deleted
            FROM ${PETS_TABLE}
            WHERE is_deleted = false AND ${whereString};
        `, queryParams);
            const pet = result && result[0];
            if (!pet) {
                return undefined;
            }
            const birthTimestampMs = pet['birthTimestampMs'];
            return {
                id: pet['id'],
                name: pet['name'],
                type: pet['type'],
                breed: pet['breed'],
                colorDescription: pet['colorDescription'],
                gender: pet['gender'],
                birthTimestampMs: birthTimestampMs.toNumber(),
                description: pet['description'],
                photoIdsJsonArray: pet['photoIdsJsonArray'],
                ownerId: pet['ownerId'],
                isDeleted: pet['isDeleted'],
            };
        });
    }
}
exports.PetsRepository = PetsRepository;
