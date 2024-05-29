// Packages
import {
  Request,
  Response,
} from 'express';

/**
 * API request object.
 */
export type ServerRequest = Request;

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
