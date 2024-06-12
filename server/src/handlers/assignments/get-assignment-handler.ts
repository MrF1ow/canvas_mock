// Local Imports
import { MESSAGE_HANDLER_PARAMETER_MISSING, MESSAGE_HANDLER_ITEM_NOT_FOUND, MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import {
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
 * Returns summary data about the Assignment, excluding the list of Submissions.
 */

// WORKS
export class GetAssignmentHandler extends Handler {
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
      if (!id) {
        res.status(404).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'assignment',
            'ID',
          ),
        });
        return;
      }

      const assignment = await Handler._database.assignments.findById(id);

      if (!assignment) {
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
        ...assignment,
      });
    } catch (error) {
      Monitor.log(
        GetAssignmentHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
