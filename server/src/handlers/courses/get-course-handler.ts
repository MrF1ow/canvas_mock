// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
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

// Checked and works.

/**
 * Returns summary data about the Course, excluding the list of students enrolled in the course and the list of Assignments for the course.
 */
export class GetCourseHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id',
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

      // Retrieve the course by Id.
      const course = await Handler._database.courses.findById(id);

      // Did it exist?
      if (!course) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'Course',
            'ID',
            id,
          ),
        });
        return;
      }

      res.status(200).send({
        course,
      });
    } catch (error) {
      Monitor.log(
        GetCourseHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
