// Local Imports
import { CreateAssignmentSubmissionsHandler } from './create-assignment-submissions-handler';
import { GetAssignmentSubmissionsHandler } from './get-assignment-submissions-handler';
import { CreateAssignmentHandler } from './create-assignment-handler';
import { DeleteAssignmentHandler } from './delete-assignment-handler';
import { EditAssignmentHandler } from './edit-assignment-handler';
import { GetAssignmentHandler } from './get-assignment-handler';
import { Router } from '../router';

/**
 * Assignment routes.
 */
export class AssignmentRoutes extends Router {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/assignments');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new CreateAssignmentHandler());
    this._routes.push(new CreateAssignmentSubmissionsHandler());
    this._routes.push(new DeleteAssignmentHandler());
    this._routes.push(new EditAssignmentHandler());
    this._routes.push(new GetAssignmentHandler());
    this._routes.push(new GetAssignmentSubmissionsHandler());
  }
}
