// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
  USER_ROLE,
} from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { Enrolled } from '../../types/tables';

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
      AUTHORIZATION_TYPE.REQUIRED,
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
      // Check for authentication.
      if (!req.user) {
        res.status(403).send({
          error: MESSAGE_UNAUTHORIZED_ERROR,
        });
        return;
      }

      // Parse request parameters.
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

      // Get the user.
      const user = await Handler._database.users.findById(req.user);

      // Check their role.
      if (user.role !== USER_ROLE.ADMIN) {
        const course = await Handler._database.courses.findById(id);

        if (course.instructorId !== req.user) {
          res.status(403).send({
            error: MESSAGE_UNAUTHORIZED_ERROR,
          });
          return;
        }
      }

      // Get enrolled students.
      const enrollment = await Handler._database.enrolled.find({ courseId: id });

      // The documentation isn't clear if we're supposed to return Ids or objects,
      // The comments say just Ids, but the yaml specifies objects.
      res.status(200).send({
        students: enrollment.map((enrolled: Enrolled) => enrolled.studentId),
      });
      // const users = await Handler._database.users.find({
      //   id: {
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
