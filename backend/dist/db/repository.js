"use strict";
// import { Ydb } from 'ydb-sdk';
// import { getQueryExecutor, QueryParams } from './db';
// const uuid = require('uuid');
// interface DbRequestParams {
//     declarations: string; 
//     whereString: string;
//     queryParams: QueryParams;
// }
// const TYPE_ID_TO_DECLARATION: Record<any, string> = {
//     [Ydb.Type.PrimitiveTypeId.UTF8]: 'Utf8',
//     [Ydb.Type.PrimitiveTypeId.BOOL]: 'Bool',
//     [Ydb.Type.PrimitiveTypeId.UINT8]: 'Uint8',
//     [Ydb.Type.PrimitiveTypeId.UINT64]: 'Uint64',
// };
// export class Repository<TEntity> {
//     tableName: string;
//     constructor (tableName: string) {
//         this.tableName = tableName;
//     }
//     mapRaw (raw: any): TEntity | undefined {
//         return undefined;
//     }
//     selectFields(): string[] {
//         return ['id', 'name', 'avatar_url', 'email', 'origin', 'origin_id', 'is_admin'];
//     }
//     async getEntity (requestParams: DbRequestParams): Promise<TEntity | undefined> {
//         const {whereString, queryParams} = requestParams;
//         const fields = this.selectFields().join()
//         const declarations = this.getDeclarationsForParams(queryParams)
//         const executeQuery = await getQueryExecutor();
//         const result = await executeQuery(`
//             ${declarations};
//             SELECT ${fields}
//             FROM ${this.tableName}
//             WHERE is_deleted = false AND ${whereString};
//         `, queryParams);
//         const raw = result && result[0];
//         if (!raw) {
//             return undefined;
//         }
//         return this.mapRaw(raw)
//     }
//     async createEntity (entity: TEntity): Promise<TEntity | undefined> {
//         const executeQuery = await getQueryExecutor();
//         await executeQuery(`
//             DECLARE $id AS Utf8;
//             DECLARE $name AS Utf8;
//             DECLARE $avatar_url AS Utf8;
//             DECLARE $origin AS Utf8;
//             DECLARE $origin_id AS Utf8;
//             DECLARE $email AS Utf8;
//             DECLARE $is_admin AS Bool;
//             DECLARE $is_deleted AS Bool;
//             UPSERT INTO ${USERS_TABLE}
//                 (id, avatar_url, email, is_admin, is_deleted, name, origin, origin_id)
//             VALUES ($id, $avatar_url, $email, $is_admin, $is_deleted, $name, $origin, $origin_id);
//         `, {
//             '$id': userEntity.typedId,
//             '$name': userEntity.typedName,
//             '$avatar_url': userEntity.typedAvatarUrl,
//             '$origin': userEntity.typedOrigin,
//             '$origin_id': userEntity.typedOriginId,
//             '$email': userEntity.typedEmail,
//             '$is_admin': userEntity.typedIsAdmin,
//             '$is_deleted': userEntity.typedIsDeleted,
//         });
//         return await this.getUserById(generatedId);
//     }
//     private getDeclarationsForParams(queryParams: QueryParams): string[] {
//         return Object.keys(queryParams).map((key) => {
//             const type = queryParams[key] as Ydb.ITypedValue;
//             const typeId = type.type?.typeId as Ydb.Type.PrimitiveTypeId;
//             if (!typeId) {
//                 throw Error(`Invalid type id. Query param key: ${key}.`);
//             }
//             const declarationType = TYPE_ID_TO_DECLARATION[typeId];
//             if (typeof(declarationType) !== 'string') {
//                 throw Error(`No declaration for type. Query param key: ${key}.`);
//             }
//             return `DECLARE ${key} AS ${declarationType}`;
//         });
//     }
// }
