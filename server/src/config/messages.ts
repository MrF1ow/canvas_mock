/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CONNECTION_SUCCESS = 'Database connection successful.';

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS = 'Connected to cache database for testing purposes, change to MongoDB for production.';

/**
 * Error message thrown when abstract database is used.
 */
export const MESSAGE_USED_ABSTRACT_DATABASE_ERROR = 'Attempted to use Abstract Database, use a concrete implementation instead.';

/**
 * Error message thrown when abstract data access object is used.
 */
export const MESSAGE_USED_ABSTRACT_DAO_ERROR = 'Attempted to use Abstract Data Access Object, use a concrete implementation instead.';

/**
 * Error message thrown when database URL is missing.
 */
export const MESSAGE_DATABASE_URL_MISSING_ERROR = 'Database URL not set in .env!';

/**
 * Internal server error message.
 */
export const MESSAGE_INTERNAL_SERVER_ERROR = 'Internal Server Error';

/**
 * Unauthorized error message.
 */
export const MESSAGE_UNAUTHORIZED_ERROR = 'Unauthorized.';

/**
* Error message for using abstract handler.
*/
export const MESSAGE_USED_ABSTRACT_HANDLER_ERROR = 'Attempted to use Abstract Handler, use a concrete implementation instead.';

/**
 * Error message thrown when a parameter is missing in a general request.
 *
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter missing.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_PARAMETER_MISSING = (
  item: string,
  parameter: string,
) => `${parameter} for ${item} not provided`;

/**
 * Success message for a successful request.
 * 
 * @param {string} item Item successfully found or updated.
 * @param {string} parameter Name of parameter searched.
 */
export const MESSAGE_HANDLER_UPDATE_SUCCESS = (
  item: string,
  parameter: string,
) => `${item} by the ${parameter} successfully updated.`;

/**
 * Error message thrown when an item is requested that doesn't exist.
 *
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter searched.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_ITEM_NOT_FOUND = (
  item: string,
  parameter: string,
  value: string,
) => `${item} by the ${parameter} '${value}' not found.`;

/**
 * Error for invalid authentication request.
 * 
 * @constant
 */
export const MESSAGE_AUTHENTICATION_ERROR = 'Issue authenticating you!';

/**
 * Error for invalid user login not being present in Database.
 * 
 * @constant
 */
export const MESSAGE_MISSING_USER_INFORMATION = 'Unable to retrieve user information.';

/**
 * Error for malformed requests missing a user ID.
 * 
 * @constant
 */
export const MESSAGE_MISSING_USER_ID = 'No user ID provided.';

/**
 * Authentication server error message.
 * 
 * @constant
 */
export const MESSAGE_UNAUTHORIZED = 'Not a valid user session.';

/**
 * Error for handler not found.
 * 
 * @constant
 */
export const MESSAGE_HANDLER_NOT_FOUND_ERROR = 'Handler was not found';
