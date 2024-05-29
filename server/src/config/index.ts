// Local Imports
import { Environment } from '../helpers/environment';

// Types
import {
  DatabaseType,
  Dictionary,
  RequestAuthorization,
  RequestType,
} from '../types';

/**
 * Various request types enum.
 * 
 * @enum
 */
export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
} as Dictionary<RequestType>;

/**
 * Database type enum.
 * 
 * @enum
 */
export const DATABASE_TYPE = {
  'MONGO': 'mongo',
  'MONGO_LOCAL': 'mongo-local',
  'CACHE': 'cache',
} as Dictionary<DatabaseType>;

/**
 * Different authorization requirements for endpoints.
 */
export const AUTHORIZATION_TYPE = {
  NONE: 'none',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
} as Dictionary<RequestAuthorization>;


/**
 * Developmental URL.
 */
export const DEVELOPMENT_URL = `http://localhost:${Environment.getPort()}`;

/**
 * Production URL.
 */
export const PRODUCTION_URL = '';

/**
 * Salt work factor.
 */
export const SALT_WORK_FACTOR = 8;
