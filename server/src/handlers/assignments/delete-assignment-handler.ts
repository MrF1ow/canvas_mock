// Local Imports
import { 
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING
} from '../../config/messages';
import { AUTHORIZATION_TYPE, REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Completely removes the data for the specified Assignment, including all submissions.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId` can delete an Assignment.
 */
export class DeleteAssignmentHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.DELETE,
      '/:id',
      AUTHORIZATION_TYPE.INSTRUCTOR || AUTHORIZATION_TYPE.ADMIN,
    );
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
    try {
        // ADD CHECK FOR INSTRUCTOR ID with COURSE ID (make sure instructor is the instructor of the course)

      const { id } = req.params || {};

      if (!id) {
        res.status(404).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'ID',
          ),
        });
        return;
      }

      const assignment = await Handler._database.assignments.deleteById(id);

      if (!assignment) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'assignment',
            'ID',
            id,
          ),
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      Monitor.log(
        DeleteAssignmentHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
