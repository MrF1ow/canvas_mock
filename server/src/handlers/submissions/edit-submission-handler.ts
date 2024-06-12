// Local Imports
import { AUTHORIZATION_TYPE, REQUEST_TYPE } from '../../config';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import { ServerRequest, ServerResponse } from '../../types';

/**
 * Performs a partial update on the data for the Assignment.  Note that submissions 
 * cannot be modified via this endpoint.  Only an authenticated User with 'admin' 
 * role or an authenticated 'instructor' User whose ID matches the `instructorId` of 
 * the Course corresponding to the Assignment's `courseId` can update an Assignment.
 */
export class EditSubmissionHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.PATCH,
      '/:id',
      AUTHORIZATION_TYPE.INSTRUCTOR,
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
      const { body } = req;

      const requestUser = await Handler._database.users.findById(req.user);

      const submission = await Handler._database.submissions.findById(id);
      if (!submission) {
        res.status(404).send({
          error: 'Specified Submission `id` not found',
        });
        return;
      }

      if (requestUser.role !== 'admin') {
        const assignment = await Handler._database.assignments.findById(submission.assignmentId);
        const course = await Handler._database.courses.findById(assignment.courseId);

        if (course.instructorId !== requestUser._id) {
          res.status(403).send({
            error: 'Unauthorized.',
          });
          return;
        }
        
      }


      if (!body || Object.keys(body).length === 0 || !('grade' in body) || Object.keys(body).length > 1) {
        res.status(400).send({
          error: 'The request body was either not present, did not contain a grade field, or contained additional fields.',
        });
        return;
      }
    
      const updatedSubmission = await Handler._database.submissions.update(
        { id },
        { grade: body.grade },
      );

      res.status(200).send(updatedSubmission);
    } catch (error) {
      Monitor.log(
        EditSubmissionHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
