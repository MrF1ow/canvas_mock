// Local Imports
import { AbstractDatabase } from '../database/abstract-database';
import { getDatabase } from '../database';
import { Monitor } from '../helpers/monitor';

// Types
import {
  RequestType,
  ServerRequest,
  ServerResponse,
} from '../types';

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
   * Instantiates a new handler.
   * 
   * @param {RequestType} method Request type.
   * @param {string} path Request path.
   */
  constructor(
    method: RequestType,
    path: string,
  ) {
    if (!Handler._database) {
      Handler._database = getDatabase();
    }

    this._connectDatabase();

    this._method = method;
    this._path = path;
  }

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
  ): Promise<void> {
  }

  /**
   * Connects to the database.
   */
  async _connectDatabase(): Promise<void> {
    try {
      if (!Handler._database.isConnected()) {
        await Handler._database.connect();
      }
    } catch (error) {
      Monitor.trace(
        Handler,
        `Failed to connect to database: ${error}`,
        Monitor.Layer.WARNING,
      );
    }
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
}