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
exports.getQueryExecutor = void 0;
const ydb_sdk_1 = require("ydb-sdk");
const DB_ENTRY_POINT = 'grpcs://ydb.serverless.yandexcloud.net:2135';
const DB_NAME = '/ru-central1/b1gmi212gqtn4ng1roqp/etn2vdsjf0st6gt380ir';
const dbLogger = (0, ydb_sdk_1.getLogger)({ level: 'debug' });
const dbAuthService = (0, ydb_sdk_1.getCredentialsFromEnv)(DB_ENTRY_POINT, DB_NAME, dbLogger);
const dbDriver = new ydb_sdk_1.Driver(DB_ENTRY_POINT, DB_NAME, dbAuthService);
let savedQueryExecutor = undefined;
function getQueryExecutor() {
    return __awaiter(this, void 0, void 0, function* () {
        if (savedQueryExecutor) {
            return savedQueryExecutor;
        }
        if (!(yield dbDriver.ready(10000))) {
            console.error(`DB driver has not become ready in 10 seconds!`);
            throw Error("Cannot connect to DB");
        }
        const queryExecutor = yield dbDriver.tableClient.withSession((session) => __awaiter(this, void 0, void 0, function* () {
            return createQueryExecutor(session);
        }));
        savedQueryExecutor = queryExecutor;
        return queryExecutor;
    });
}
exports.getQueryExecutor = getQueryExecutor;
function createQueryExecutor(dbSession) {
    return (queryString, params) => __awaiter(this, void 0, void 0, function* () {
        const preparedQuery = yield dbSession.prepareQuery(queryString);
        const { resultSets = [] } = (yield dbSession.executeQuery(preparedQuery, params)) || {};
        const firstResultSet = resultSets[0];
        if (!firstResultSet) {
            return undefined;
        }
        return ydb_sdk_1.TypedData.createNativeObjects(firstResultSet);
    });
}
