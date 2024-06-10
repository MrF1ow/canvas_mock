// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_UNAUTHORIZED_ERROR,
  MESSAGE_HANDLER_UPDATE_SUCCESS } from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
  USER_ROLE,
} from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import { DatabaseColumnTypes } from '@/types/database';

/**
 * Performs a partial update on the data for the Assignment.  Note that submissions cannot be modified via this endpoint.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId` can update an Assignment.
 */
export class EditAssignmentHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.PATCH,
      '/:id',
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

      const { id } = req.params || {};

      if (!id) {
        res.status(404).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'ID',
          ),
        });
        return;
      }

      // Checking if rows changed instead of checking if assignment exists to avoid unnecessary query

      // const assignment = await Handler._database.assignments.findOne({ id });
      // if (!assignment) {
      //   res.status(404).send({
      //     error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
      //       'assignment',
      //       'ID',
      //       id,
      //     ),
      //   });
      //   return;
      // }

      const {
        courseId = undefined,
        title = undefined,
        points = undefined,
        due = undefined,
      } = req.body || {};

      if (courseId === undefined
        && title === undefined
        && points === undefined
        && due === undefined) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'Update parameters',
          ),
        });

        return;
      }

      const update = {} as Dictionary<DatabaseColumnTypes>;

      if (courseId !== undefined) {
        update.courseId = `${courseId}`;
      }
      if (title !== undefined) {
        update.title = `${title}`;
      }
      if (points !== undefined) {
        update.points = `${points}`;
      }
      if (due !== undefined) {
        update.due = `${due}`;
      }

      const user = await Handler._database.users.findById(req.user);

      // If user is an instructor, check if the course is taught by the instructor
      if (user.role === USER_ROLE.INSTRUCTOR) {
        const course = await Handler._database.courses.findById(courseId);

        // If the instructor is not the instructor of the course they are trying to create an assignment for
        if (course.instructorId !== req.user) {
          // Send an unauthorized error
          res.status(403).send({
            error: MESSAGE_UNAUTHORIZED_ERROR,
          });

          return;
        }
      }

      const status = await Handler._database.assignments.update(
        { id },
        update,
        false,
      );

      if (!status) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'assignment',
            'ID',
            id,
          ),
        });
        return;
      }

      res.status(200).send({
        message: MESSAGE_HANDLER_UPDATE_SUCCESS(
          'Assignment',
          'ID',
        ),
      });


    } catch (error) {
      Monitor.log(
        EditAssignmentHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
