// Local Imports
import { GetSubmissionMediaHandler } from './get-submission-media-handler';
import { EditSubmissionHandler } from './edit-submission-handler';
import { Router } from '../router';

/**
 * Submission routes.
 */
export class SubmissionRoutes extends Router {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/submissions');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new EditSubmissionHandler());
    this._routes.push(new GetSubmissionMediaHandler());
  }
}
