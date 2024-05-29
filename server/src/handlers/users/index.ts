// Local Imports
import { RegisterHandler } from './register-handler';
import { GetUserHandler } from './get-user-handler';
import { LoginHandler } from './login-handler';
import { Router } from '../router';

/**
 * User routes.
 */
export class UserRoutes extends Router {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/users');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new GetUserHandler());
    this._routes.push(new LoginHandler());
    this._routes.push(new RegisterHandler());
  }
}
