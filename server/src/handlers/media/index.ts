// Local Imports
import { GetSubmissionMediaHandler } from './get-submission-media-handler';
import { Router } from '../router';

/**
 * Submission routes.
 */
export class MediaRoutes extends Router {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/media');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new GetSubmissionMediaHandler());
  }
}
