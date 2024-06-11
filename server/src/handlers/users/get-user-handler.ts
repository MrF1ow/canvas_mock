// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { REQUEST_TYPE } from '../../config';
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
