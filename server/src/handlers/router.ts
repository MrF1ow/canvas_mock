// Packages
import {
  Application,
  Router as ExpressRouter,
} from 'express';

// Local Imports
import {
  optionalAuthorization,
  requiresAdmin,
  requiresAuthorization,
  requiresInstructor,
} from '../helpers/authorization';
import { upload } from '../helpers/grid';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
} from '../config';
import { Handler } from './handler';

// Types
import { Middleware } from '../types';
import multer from 'multer';

/**
 * Wrapper around express router.
 */
export class Router {
  /**
   * Path for routes under this router.
   */
  protected _path: string;

  /**
   * Instance of express router.
   */
  protected _router: ExpressRouter;

  /**
   * Various handlers.
   */
  protected _routes = [] as Handler[];

  /**
   * Instantiates an router wrapper.
   */
  constructor(path: string) {
    this._path = path;
    this._router = ExpressRouter();

    this._initialize();
  }

  /**
   * Initializes all routes.
   *
   * @returns {void}
   */
  _initialize(): void {
  }

  /**
   * Apply various routes to application.
   *
   * @param {Application} app Express application.
   * @returns {void}
   */
  apply(app: Application): void {
    for (let i = 0; i < this._routes.length; i += 1) {
      const handler = this._routes[i];

      const middleware = [ handler.execute ] as Middleware[];

      if (handler.getUpload() == true){
        middleware.unshift(upload)
      }

      if (handler.getAuthorization() === AUTHORIZATION_TYPE.REQUIRED) {
        middleware.unshift(requiresAuthorization);
      } else if (handler.getAuthorization() === AUTHORIZATION_TYPE.OPTIONAL) {
        middleware.unshift(optionalAuthorization);
      } else if (handler.getAuthorization() === AUTHORIZATION_TYPE.ADMIN) {
        middleware.unshift(requiresAdmin);
      } else if (handler.getAuthorization() === AUTHORIZATION_TYPE.INSTRUCTOR) {
        middleware.unshift(requiresInstructor);
      }

      switch (handler.getMethod()) {
        case REQUEST_TYPE.POST:
          app.post(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
        case REQUEST_TYPE.PATCH:
          app.patch(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
        case REQUEST_TYPE.DELETE:
          app.delete(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
        default:
          app.get(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
      }
    }
  }
}
