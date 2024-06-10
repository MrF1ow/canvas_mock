// Local Imports
import { MESSAGE_HANDLER_ITEM_NOT_FOUND, MESSAGE_HANDLER_PARAMETER_MISSING, MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AUTHORIZATION_TYPE, REQUEST_TYPE } from '../../config';
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
 * Performs a partial update on the data for the Course.  Note that enrolled students and assignments cannot be modified via this endpoint.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course can update Course information.
 */
export class EditCourseHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.PATCH,
      '/:id',
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
        subject = undefined,
        number = undefined,
        title = undefined,
        term = undefined,
        instructorId = undefined,
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
      if (subject === undefined
        && number === undefined
        && title === undefined
        && term === undefined
        && instructorId === undefined) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'course',
            'Update parameters',
          ),
        });
        return;
      }

      // Check if the course exists, this will slow things down? Gonna check rows changed instead.
      // const course = await Handler._database.courses.findById(id);
      // if (!course) {
      //   res.status(404).send({
      //     error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
      //       'Course',
      //       'ID',
      //       id
      //     ),
      //   });
      // }

      // Prepare update object.
      const update = {} as Dictionary<DatabaseColumnTypes>;
      if (subject !== undefined) {
        update.subject = `${subject}`;
      }
      if (number !== undefined) {
        update.number = `${number}`;
      }
      if (title !== undefined) {
        update.title = `${title}`;
      }
      if (term !== undefined) {
        update.term = `${term}`;
      }
      if (instructorId !== undefined) {
        // No present check if instructor exists.
        update.instructorId = `${instructorId}`;
      }

      // Update and check status.
      const status = await Handler._database.courses.update(
        { id },
        update,
        false, // If we're using status we need to not insert new documents.
      );

      // If no row was changed.
      if (!status) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'Course',
            'ID',
            id,
          ),
        });
        return;
      }

      res.status(200).send({});
    } catch (error) {
      Monitor.log(
        EditCourseHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
