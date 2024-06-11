// Packages
import {
  Request,
  Response,
} from 'express';

import multer from "multer"

/**
 * API request object.
 */
export interface ServerRequest extends Request {
  /**
   * User ID.
   */
  user?: string;
}

/**
 * API response object.
 */
export type ServerResponse = Response;

/**
 * Basic object type.
 */
export type Dictionary<T> = Record<string, T>;

/**
 * Various request types.
 */
export type RequestType = 'get'
| 'patch'
| 'post'
| 'delete';

/**
 * Different authorization requirements for endpoints.
 */
export type RequestAuthorization = 'none'
| 'required'
| 'optional'
| 'admin';

/**
 * Database type enum.
 */
export type DatabaseType = 'mongo'
| 'mongo-local'
| 'cache';

/**
 * Authorization token data.
 */
export interface TokenData {
  /**
   * User ID.
   */
  sub: string;
}

/**
 * Middleware function.
 *
 */
export type Middleware = multer.Multer | ((
  req?: ServerRequest,
  res?: ServerResponse,
  next?: Middleware,
) => Promise<void> | void);
