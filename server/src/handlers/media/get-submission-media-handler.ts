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
import { MongoDatabase } from '../../database/mongo-database';
import { GridFSBucket } from 'mongodb';

/**
 * Download a Submission's associated file.  Only an authenticated User with 'admin' role or an
 * authenticated 'instructor' User whose ID matches the `instructorId` of the associated course 
 * can update a Submission.
 */
export class GetSubmissionMediaHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/submissions/:filename',
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

      const requestUser = await Handler._database.users.findById(req.user);
      const { filename } = req.params;

      if (requestUser.role !== 'admin') {

        const filePath = `/media/submissions/${filename}`;
        const submission = await Handler._database.submissions.findOne({ file: filePath });
        const assignment = await Handler._database.assignments.findById(submission.assignmentId);
        const course = await Handler._database.courses.findById(assignment.courseId);

        if (course.instructorId !== requestUser._id) {
          res.status(403).send({
            error: 'Unauthorized.',
          });
          return;
        }

      }

      const db = (Handler._database as MongoDatabase).db();

      const bucket = new GridFSBucket(db, {
        bucketName: 'uploads',
      });

      let downloadStream = bucket.openDownloadStreamByName(filename);

      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });

      downloadStream.on('error', () => {
        res.sendStatus(404);
      });

      downloadStream.on('end', () => {
        res.end();
      });
      


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
