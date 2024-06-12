// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
} from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

// Checked and works.

/**
 * Completely removes the data for the specified Course, including all enrolled students, all Assignments, etc.  Only an authenticated User with 'admin' role can remove a Course.
 */
export class DeleteCourseHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.DELETE,
      '/:id',
      AUTHORIZATION_TYPE.ADMIN,
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
      // Parse path parameters.
      const { id } = req.params || {};

      // Check for all required parameters.
      if (!id) {
        res.status(404).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'ID',
          ),
        });
        return;
      }

      // Get all assignments.
      const assignments = await Handler._database.assignments.find({ courseId: id });

      // Delete and check if successful.
      const promises = [];

      promises.push(Handler._database.courses.deleteById(id));
      promises.push(Handler._database.enrolled.delete({ courseId: id }));

      // Delete all submissions to assignments.
      for (let i = 0; i < assignments.length; i += 1) {
        const assignment = assignments[i];

        promises.push(Handler._database.submissions.delete({ assignmentId: assignment.id }));
      }

      await Promise.all(promises);

      // Now delete assignments.
      await Handler._database.assignments.delete({ courseId: id });

      // If unsuccessful.
      if (!(await promises[0])) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'Course',
            'ID',
            id,
          ),
        });
        return;
      }

      res.status(204).send({});
    } catch (error) {
      Monitor.log(
        DeleteCourseHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
