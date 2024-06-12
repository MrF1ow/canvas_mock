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
 * Download a Submission's associated file.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the associated course can update a Submission.
 */
export class GetSubmissionMediaHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/submissions/:filename',
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

      const { id } = req.params;

      const submission = await Handler._database.submissions.findOne({ id });
      if (!submission) {
        res.status(404).send({
          error: 'Specified Submission `id` not found',
        });
        return;
      }

      // const fileBuffer = Buffer.from(submission.file, 'binary');
      // res.write(fileBuffer);
      // res.end();


    } catch (error) {
      Monitor.log(
        GetSubmissionMediaHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
