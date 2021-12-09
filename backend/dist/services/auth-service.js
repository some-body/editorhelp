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
exports.getAuthSeviceFactory = exports.AuthService = void 0;
const errors_1 = require("../errors");
const NAME_PLACEHOLDER = "Без Имени";
class AuthService {
    constructor(req, externalApi, usersRepository) {
        this.req = req;
        this.externalApi = externalApi;
        this.usersRepository = usersRepository;
    }
    requireCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const externalUser = yield this.requireExternalUser();
            const user = yield this.usersRepository.getUserByOriginId(externalUser.externalId);
            if (!user) {
                throw new errors_1.HttpException(401, 'User is not registered.');
            }
            return user;
        });
    }
    getOrCreateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const externalUser = yield this.requireExternalUser();
            const user = yield this.usersRepository.getUserByOriginId(externalUser.externalId);
            if (user) {
                return user;
            }
            const userToCreate = {
                email: externalUser.email || '',
                originId: externalUser.externalId,
                origin: externalUser.origin,
                name: externalUser.name || NAME_PLACEHOLDER,
                avatarUrl: externalUser.avatarUrl || '',
                isAdmin: false,
            };
            const createdUser = yield this.usersRepository.createUser(userToCreate);
            if (!createdUser) {
                throw new errors_1.HttpException(500, 'Cannot create user.');
            }
            return createdUser;
        });
    }
    requireExternalUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.requireToken();
            const user = yield this.externalApi.getExternalUser(token);
            if (!user) {
                throw new errors_1.HttpException(401, 'Invalid token.');
            }
            return user;
        });
    }
    requireToken() {
        const token = this.req.headers['x-id-token'];
        if (typeof (token) !== 'string') {
            throw new errors_1.HttpException(401, 'x-id-token header is expected.');
        }
        return token;
    }
}
exports.AuthService = AuthService;
function getAuthSeviceFactory(externalApi, usersRepository) {
    return (req) => new AuthService(req, externalApi, usersRepository);
}
exports.getAuthSeviceFactory = getAuthSeviceFactory;
