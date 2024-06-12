// Local Imports
import { AbstractDatabase } from '../database/abstract-database';
import { getDatabase } from '../database';

// Types
import {
  RequestAuthorization,
  RequestType,
  ServerRequest,
  ServerResponse,
} from '../types';
import { AUTHORIZATION_TYPE } from '../config';

/**
 * Abstract handler class.
 */
export class Handler {
  /**
   * Database instance.
   */
  protected static _database: AbstractDatabase;

  /**
   * Handler request type.
   */
  protected _method: RequestType;

  /**
   * Handler path.
   */
  protected _path: string;

  /**
   * Whether this handler requires authorization.
   */
  protected _authorization: RequestAuthorization;

  /**
   * Whether to provide user object.
   */
  protected _getUser: boolean;

  /**
   * Whether this handler requires a file upload.
   */
  protected _upload: boolean;

  /**
   * Instantiates a new handler.
   *
   * @param {RequestType} method Request type.
   * @param {string} path Request path.
   * @param {RequestAuthorization} authorization Authorization type for this endpoint.
   */
  constructor(
    method: RequestType,
    path: string,
    authorization: RequestAuthorization = AUTHORIZATION_TYPE.NONE,
    getUser = false,
    upload = false,
  ) {
    if (!Handler._database) {
      Handler._database = getDatabase();
    }

    this._connectDatabase();

    this._method = method;
    this._path = path;
    this._authorization = authorization;
    this._getUser = getUser;
    this._upload = upload;
  }

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(req: ServerRequest, res: ServerResponse): Promise<void> {}

  /**
   * Connects to the database.
   */
  async _connectDatabase(): Promise<void> {
  }

  /**
   * Retrieves this handler's request method.
   *
   * @returns {RequestType} Handler's request method..
   */
  getMethod(): RequestType {
    return this._method;
  }

  /**
   * Retrieves this handler's path.
   *
   * @returns {string} Handler's path.
   */
  getPath(): string {
    return this._path;
  }

  /**
   * Whether this endpoint requires authorization.
   */
  getAuthorization(): RequestAuthorization {
    return this._authorization;
  }

  /**
   * Whether to provide user data.
   */
  getUser(): boolean {
    return this._getUser;
  }

  /**
   * Whether this endpoint requires file upload.
   */
  getUpload(): boolean {
    return this._upload;
  }

  /**
   * Retrieves database instance.
   */
  static getDatabase(): AbstractDatabase {
    return Handler._database;
  }
}
