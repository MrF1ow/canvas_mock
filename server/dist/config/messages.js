"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_HANDLER_NOT_FOUND_ERROR = exports.MESSAGE_UNAUTHORIZED = exports.MESSAGE_MISSING_USER_ID = exports.MESSAGE_MISSING_USER_INFORMATION = exports.MESSAGE_AUTHENTICATION_ERROR = exports.MESSAGE_HANDLER_PARAMETER_MISSING = exports.MESSAGE_USED_ABSTRACT_HANDLER_ERROR = exports.MESSAGE_UNAUTHORIZED_ERROR = exports.MESSAGE_INTERNAL_SERVER_ERROR = exports.MESSAGE_DATABASE_URL_MISSING_ERROR = exports.MESSAGE_USED_ABSTRACT_DAO_ERROR = exports.MESSAGE_USED_ABSTRACT_DATABASE_ERROR = exports.MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS = exports.MESSAGE_DATABASE_CONNECTION_SUCCESS = void 0;
/**
 * Response to database connection.
 */
exports.MESSAGE_DATABASE_CONNECTION_SUCCESS = 'Database connection successful.';
/**
 * Response to database connection.
 */
exports.MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS = 'Connected to cache database for testing purposes, change to MongoDB for production.';
/**
 * Error message thrown when abstract database is used.
 */
exports.MESSAGE_USED_ABSTRACT_DATABASE_ERROR = 'Attempted to use Abstract Database, use a concrete implementation instead.';
/**
 * Error message thrown when abstract data access object is used.
 */
exports.MESSAGE_USED_ABSTRACT_DAO_ERROR = 'Attempted to use Abstract Data Access Object, use a concrete implementation instead.';
/**
 * Error message thrown when database URL is missing.
 */
exports.MESSAGE_DATABASE_URL_MISSING_ERROR = 'Database URL not set in .env!';
/**
 * Internal server error message.
 */
exports.MESSAGE_INTERNAL_SERVER_ERROR = 'Internal Server Error';
/**
 * Unauthorized error message.
 */
exports.MESSAGE_UNAUTHORIZED_ERROR = 'Unauthorized.';
/**
* Error message for using abstract handler.
*/
exports.MESSAGE_USED_ABSTRACT_HANDLER_ERROR = 'Attempted to use Abstract Handler, use a concrete implementation instead.';
/**
 * Error message thrown when a parameter is missing in a general request.
 *
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter missing.
 * @returns {string} Error message.
 */
var MESSAGE_HANDLER_PARAMETER_MISSING = function (item, parameter) { return "".concat(parameter, " for ").concat(item, " not provided"); };
exports.MESSAGE_HANDLER_PARAMETER_MISSING = MESSAGE_HANDLER_PARAMETER_MISSING;
/**
 * Error for invalid authentication request.
 *
 * @constant
 */
exports.MESSAGE_AUTHENTICATION_ERROR = 'Issue authenticating you!';
/**
 * Error for invalid user login not being present in Database.
 *
 * @constant
 */
exports.MESSAGE_MISSING_USER_INFORMATION = 'Unable to retrieve user information.';
/**
 * Error for malformed requests missing a user ID.
 *
 * @constant
 */
exports.MESSAGE_MISSING_USER_ID = 'No user ID provided.';
/**
 * Authentication server error message.
 *
 * @constant
 */
exports.MESSAGE_UNAUTHORIZED = 'Not a valid user session.';
/**
 * Error for handler not found.
 *
 * @constant
 */
exports.MESSAGE_HANDLER_NOT_FOUND_ERROR = 'Handler was not found';
