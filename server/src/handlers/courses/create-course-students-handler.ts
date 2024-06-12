// Local Imports
import {
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

/**
 * Enrolls and/or unenrolls students from a Course.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course can update the students enrolled in the Course.
 */
export class CreateCourseStudentsHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/:id/students',
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

      // Parse body paramters.
      const {
        add = undefined,
        remove = undefined,
      } = req.body || {};

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

      // Request body is required.
      if ((add === undefined
        || !(add instanceof Array)
        || !add.length)
        && (remove === undefined
        || !(remove instanceof Array)
        || !remove.length)) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Remove or add student IDs',
          ),
        });
        return;
      }

      if (remove !== undefined
        && remove instanceof Array
        && remove.length) {
        await Handler._database.enrolled.delete({
          courseId: id,
          studentId: {
            $in: remove,
          },
        });
      }
      if (add !== undefined
        && add instanceof Array
        && add.length) {
        const promises = [];

        for (let i = 0; i < add.length; i += 1) {
          promises.push(Handler._database.enrolled.insert({
            courseId: id,
            studentId: add[i],
          }));
        }

        await Promise.all(promises);
      }

      res.status(200).send({});
    } catch (error) {
      Monitor.log(
        CreateCourseStudentsHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
