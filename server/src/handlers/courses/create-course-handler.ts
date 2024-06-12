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
 * Creates a new Course with specified data and adds it to the application's database.  Only an authenticated User with 'admin' role can create a new Course.
 */
export class CreateCourseHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/',
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
      // Parse request body.
      const {
        subject,
        number,
        title,
        term,
        instructorId,
      } = req.body || {};

      // Check for all required parameters.
      if (!subject) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Subject',
          ),
        });
        return;
      }
      if (!number) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Course number',
          ),
        });
        return;
      }
      if (!title) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Title',
          ),
        });
        return;
      }
      if (!term) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Term',
          ),
        });
        return;
      }
      if (!instructorId) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Instructor',
          ),
        });
        return;
      }

      // Create the course.
      await Handler._database.courses.insert({
        subject,
        number,
        title,
        term,
        instructorId,
      });

      // Find the course we just inserted.
      const course = await Handler._database.courses.findOne({
        subject,
        number,
        title,
        term,
        instructorId,
      });

      res.status(201).send({
        id: course.id,
      });
    } catch (error) {
      Monitor.log(
        CreateCourseHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
