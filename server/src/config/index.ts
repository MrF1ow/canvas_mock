// Local Imports
import { Environment } from '../helpers/environment';

// Types
import {
  Dictionary,
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
 * Dabaase type enum.
 * 
 * @enum
 */
export const DATABASE_TYPE = {
  'MONGO': 'mongo',
  'MONGO_LOCAL': 'mongo-local',
  'CACHE': 'cache',
};

/**
 * Developmental URL.
 */
export const DEVELOPMENT_URL = `http://localhost:${Environment.getPort()}`;

/**
 * Production URL.
 */
export const PRODUCTION_URL = '';