// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { Assignment } from '../../types/tables';

/**
 * Returns a list containing the Assignment IDs of all Assignments for the Course.
 */
export class GetCourseAssignmentsHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id/assignments',
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

      // Gather all assignments by that course Id.
      const assignments = await Handler._database.assignments.find({ courseId: id });

      // The documentation isn't clear if we're supposed to return Ids or objects,
      // The comments say just Ids, but the yaml specifies objects.

      // the response needs to be paginated
      res.status(200).send({
        assignments: assignments.map((assignment: Assignment) => assignment.id),
      });
      // res.status(200).send({
      //   assignments,
      // });
    } catch (error) {
      Monitor.log(
        GetCourseAssignmentsHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
