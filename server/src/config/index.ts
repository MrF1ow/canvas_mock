// Local Imports
import { Environment } from '../helpers/environment';

// Types
import {
  DatabaseType,
  Dictionary,
  RequestAuthorization,
  RequestType,
} from '../types';
import { UserRole } from '../types/tables';

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
  MONGO: 'mongo',
  MONGO_LOCAL: 'mongo-local',
  CACHE: 'cache',
} as Dictionary<DatabaseType>;

/**
 * Different authorization requirements for endpoints.
 */
export const AUTHORIZATION_TYPE = {
  NONE: 'none',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
} as Dictionary<RequestAuthorization>;

/**
 * Different user role types.
 */
export const USER_ROLE = {
  STUDENT: 'student',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
} as Dictionary<UserRole>;

/**
 * Developmental URL.
 */
export const DEVELOPMENT_URL = `http://localhost:${Environment ? Environment.getServerPort() : 8000 }`;

/**
 * Production URL.
 */
export const PRODUCTION_URL = '';

/**
 * Salt work factor.
 */
export const SALT_WORK_FACTOR = 8;

/**
 * Default pagination size.
 */
export const PAGE_SIZE = 25;
