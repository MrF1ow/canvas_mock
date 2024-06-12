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

/**
 * Returns a CSV file containing information about all of the students currently enrolled in the Course, including names, IDs, and email addresses.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course can fetch the course roster.
 */
export class GetCourseRosterHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id/roster',
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

      const enrollments = await Handler._database.enrolled.find({ courseId: id });

      const promises = [];

      for (let i = 0; i < enrollments.length; i += 1) {
        if (enrollments[i]) {
          promises.push(Handler._database.users.findById(enrollments[i].studentId));
        }
      }

      await Promise.all(promises);

      let data = 'id,name,email';

      for (let i = 0; i < promises.length; i += 1) {
        const user = await promises[i];

        data = `${data}\n"${user.id}","${user.name}","${user.email}"`;
      }

      res.type('text/csv')
        .status(200)
        .attachment(`course-roster-${id}.csv`)
        .send(data);
    } catch (error) {
      Monitor.log(
        GetCourseRosterHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
