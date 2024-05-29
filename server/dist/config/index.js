"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCTION_URL = exports.DEVELOPMENT_URL = exports.DATABASE_TYPE = exports.REQUEST_TYPE = void 0;
// Types
var environment_1 = require("@/helpers/environment");
/**
 * Various request types enum.
 *
 * @enum
 */
exports.REQUEST_TYPE = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    DELETE: 'delete',
};
/**
 * Dabaase type enum.
 *
 * @enum
 */
exports.DATABASE_TYPE = {
    'MONGO': 'mongo',
    'MONGO_LOCAL': 'mongo-local',
    'CACHE': 'cache',
};
/**
 * Developmental URL.
 */
exports.DEVELOPMENT_URL = "http://localhost:".concat(environment_1.Environment.getPort());
/**
 * Production URL.
 */
exports.PRODUCTION_URL = '';
