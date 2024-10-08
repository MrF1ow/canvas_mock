// Packages
import {
  Application,
  Router as ExpressRouter,
} from 'express';

// Local Imports
import {
  getUser,
  optionalAuthorization,
  requiresAdmin,
  requiresAuthorization,
  requiresInstructor,
} from '../helpers/authorization';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
} from '../config';
import { RateLimiter } from '../helpers/rate-limit';
import { Handler } from './handler';
import { Monitor } from '../helpers/monitor';
import { upload } from '../helpers/grid';

// Types
import {
  Middleware,
  ServerRequest,
  ServerResponse,
} from '../types';

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
   * Prints stuff.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async print(
    req: ServerRequest,
    res: ServerResponse,
    next: Middleware,
  ): Promise<void> {
    Monitor.log(
      Router,
      `${req.method.toUpperCase()} ${req.path}`,
      Monitor.Layer.UPDATE,
    );
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

      if (handler.getUpload() == true) {
        middleware.unshift(upload.single('file'));
      }

      middleware.unshift(RateLimiter.rateLimit);

      if (handler.getUser()) {
        middleware.unshift(getUser);
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

      // middleware.unshift(this.print);

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
