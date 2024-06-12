// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AUTHORIZATION_TYPE, REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Returns information about the specified User.  If the User has the 'instructor' role, the response 
 * should include a list of the IDs of the Courses the User teaches (i.e. Courses whose `instructorId` 
 * field matches the ID of this User).  If the User has the 'student' role, the response should include 
 * a list of the IDs of the Courses the User is enrolled in.  Only an authenticated User whose ID matches 
 * the ID of the requested User can fetch this information.
 */
export class GetUserHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id',
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

      const userId = req.params.id;
      const requestUser = await Handler._database.users.findById(req.user);

      if (!userId) {
        res.status(400).send({
          error: 'User ID is required.',
        });
        return;
      }

      if (!requestUser && userId !== req.user && requestUser.role !== 'admin') {
        res.status(403).send({
          error: 'Unauthorized.',
        });
        return;
      }

      const user = await Handler._database.users.findById(userId);

      if (!user) {
        res.status(404).send({
          error: 'User not found.',
        });
        return;
      }

      let returnUser : any = {};

      if (user.role === 'instructor') {

        const courses = await Handler._database.courses.find({ instructorId: userId });
        returnUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: courses.map(course => course.id),
        };

      } else if (user.role === 'student') {

        const enrollments = await Handler._database.enrolled.find({ studentId: userId });
        returnUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: enrollments.map(enrollment => enrollment.courseId),
        };

      } else {
        returnUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }

      res.status(200).send(returnUser);
      
    } catch (error) {
      Monitor.log(
        GetUserHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
