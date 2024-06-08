// Local Imports
import { MESSAGE_HANDLER_PARAMETER_MISSING, MESSAGE_HANDLER_ITEM_NOT_FOUND, MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
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
 * Create and store a new Assignment with specified data and adds it to the application's database.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId` can create an Assignment.
 */
export class CreateAssignmentHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/',
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

      const {
        courseId,
        title,
        points,
        due,
      } = req.body || {};

      // Check for all required parameters.

      // If request is missing courseId
      if (!courseId) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'Course ID',
          ),
        });

        return;
      }else{
        const course = await Handler._database.courses.findOne({
          _id: courseId,
        });

        // If course is not found in the database
        if (!course) {
          res.status(404).send({
            error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
              'Course',
              'ID',
              courseId,
            ),
          });

          return;
        }
      }

      if (!title) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'Title',
          ),
        });

        return;
      }

      if (!points) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'Points',
          ),
        });

        return;
      }

      if (!due) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'Due date',
          ),
        });

        return;
      }

      await Handler._database.assignments.insert({
        courseId,
        title,
        points,
        due,
      })

      const assignment = await Handler._database.assignments.findOne({
        courseId,
        title,
        points,
        due,
      });

      res.status(201).send({
        id: assignment._id,
      })
    } catch (error) {
      Monitor.log(
        CreateAssignmentHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
