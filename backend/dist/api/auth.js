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
exports.getExternalUser = exports.GOOGLE_ORIGIN = void 0;
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "902600816914-d0ku04k85ri8sooldrfrm9lim2473vpo.apps.googleusercontent.com";
const googleClient = new OAuth2Client(CLIENT_ID);
exports.GOOGLE_ORIGIN = 'google';
function getExternalUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield googleClient.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userId = payload['sub'];
            if (typeof (userId) !== 'string') {
                return undefined;
            }
            return {
                id: userId,
                name: payload['given_name'],
                avatarUrl: payload['picture'],
                email: payload['email'],
            };
        }
        catch (err) {
            console.error('Auth error', err);
            return undefined;
        }
    });
}
exports.getExternalUser = getExternalUser;
;
