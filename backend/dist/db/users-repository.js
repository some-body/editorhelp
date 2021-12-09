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
exports.UsersRepository = void 0;
const db_1 = require("./db");
const user_entity_1 = require("./entities/user-entity");
const uuid = require('uuid');
const USERS_TABLE = 'Users';
class UsersRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const executeQuery = yield (0, db_1.getQueryExecutor)();
            const generatedId = uuid.v4();
            const userEntity = new user_entity_1.UserEntity(Object.assign(Object.assign({}, user), { id: generatedId, isDeleted: false }));
            yield executeQuery(`
            DECLARE $id AS Utf8;
            DECLARE $name AS Utf8;
            DECLARE $avatar_url AS Utf8;
            DECLARE $origin AS Utf8;
            DECLARE $origin_id AS Utf8;
            DECLARE $email AS Utf8;
            DECLARE $is_admin AS Bool;
            DECLARE $is_deleted AS Bool;

            UPSERT INTO ${USERS_TABLE}
                (id, avatar_url, email, is_admin, is_deleted, name, origin, origin_id)
            VALUES ($id, $avatar_url, $email, $is_admin, $is_deleted, $name, $origin, $origin_id);
        `, {
                '$id': userEntity.getTypedValue('id'),
                '$name': userEntity.getTypedValue('name'),
                '$avatar_url': userEntity.getTypedValue('avatarUrl'),
                '$origin': userEntity.getTypedValue('origin'),
                '$origin_id': userEntity.getTypedValue('originId'),
                '$email': userEntity.getTypedValue('email'),
                '$is_admin': userEntity.getTypedValue('isAdmin'),
                '$is_deleted': userEntity.getTypedValue('isDeleted'),
            });
            return yield this.getUserById(generatedId);
        });
    }
    getUserByOriginId(originId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getUserBy({
                declarations: 'DECLARE $originId AS Utf8',
                whereString: 'origin_id = $originId',
                queryParams: {
                    '$originId': user_entity_1.UserEntity.getTypedOriginId(originId),
                },
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getUserBy({
                declarations: 'DECLARE $id AS Utf8',
                whereString: 'id = $id',
                queryParams: {
                    '$id': user_entity_1.UserEntity.getTypedId(id),
                },
            });
        });
    }
    getUserBy(requestParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { declarations, whereString, queryParams } = requestParams;
            const executeQuery = yield (0, db_1.getQueryExecutor)();
            const result = yield executeQuery(`
            ${declarations};
            SELECT id, name, avatar_url, email, origin, origin_id, is_admin, is_deleted
            FROM ${USERS_TABLE}
            WHERE is_deleted = false AND ${whereString};
        `, queryParams);
            const user = result && result[0];
            if (!user) {
                return undefined;
            }
            return {
                id: user['id'],
                name: user['name'],
                avatarUrl: user['avatarUrl'],
                email: user['email'],
                origin: user['origin'],
                originId: user['originId'],
                isAdmin: user['isAdmin'],
                isDeleted: user['isDeleted'],
            };
        });
    }
}
exports.UsersRepository = UsersRepository;
