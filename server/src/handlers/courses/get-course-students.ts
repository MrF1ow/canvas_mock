// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { REQUEST_TYPE } from '../../config';
import { cleanUser } from '../../helpers/authorization';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import {
  Enrolled,
  User,
} from '@/types/tables';

/**
 * Returns a list containing the User IDs of all students currently enrolled in the Course.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course can fetch the list of enrolled students.
 */
export class GetCourseStudentsHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id/students',
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

      // Get enrolled students.
      const enrolled = await Handler._database.enrolled.find({ courseId: id });

      // The documentation isn't clear if we're supposed to return Ids or objects,
      // The comments say just Ids, but the yaml specifies objects.
      res.status(200).send({
        students: enrolled.map((enrolled: Enrolled) => enrolled.studentId),
      });
      // const users = await Handler._database.users.find({
      //   _id: {
      //     $in: enrolled.map((enrolled: Enrolled) => enrolled.studentId),
      //   },
      // });
      // res.status(200).send({
      //   students: users.map((user: User) => cleanUser(user));
      // });
    } catch (error) {
      Monitor.log(
        GetCourseStudentsHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
