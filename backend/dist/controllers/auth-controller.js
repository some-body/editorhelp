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
exports.AuthController = void 0;
const api_controller_1 = require("./api-controller");
const user_dto_1 = require("./dto/user-dto");
class AuthController extends api_controller_1.ApiController {
    constructor(authServiceFactory) {
        super('/auth');
        this.authServiceFactory = authServiceFactory;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authService = this.authServiceFactory(req);
            const createdUser = yield authService.getOrCreateUser();
            res.statusCode = 201;
            res.send({ user: (0, user_dto_1.createUserDto)(createdUser) });
        });
    }
}
exports.AuthController = AuthController;
