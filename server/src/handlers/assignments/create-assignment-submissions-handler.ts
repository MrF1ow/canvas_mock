import mongoose from 'mongoose';

// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AUTHORIZATION_TYPE, REQUEST_TYPE, USER_ROLE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { fileTypes, encryptName, uploadSubmission } from '../../helpers/grid';
import { Handler } from '../handler';
import { MongoDatabase } from '../../database/mongo-database';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { MongoClient } from 'mongodb';
import { time } from 'node:console';
import { Environment } from '../../helpers/environment';

/**
 * Create and store a new Assignment with specified data and adds it to the application's database.  Only an authenticated User with 'student' role who is enrolled in the Course corresponding to the Assignment's `courseId` can create a Submission.
 */

// WORKS
export class CreateAssignmentSubmissionsHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/:id/submissions',
      AUTHORIZATION_TYPE.REQUIRED,
      false,
      true,
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
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      if (!req.file) {
        res.status(400).send({
          error: 'No file uploaded',
        });
        return;
      }

      const user = await Handler._database.users.findById(req.user);

      if (!user) {
        res.status(404).send({
          error: 'User not found',
        });
        return;
      }

      if (user.role !== USER_ROLE.STUDENT) {
        res.status(403).send({
          error: 'Unauthorized',
        });
        return;
      }

      const encryptedFileName = encryptName(req.file.originalname);
      const extension = fileTypes[req.file.mimetype];

      req.file.originalname = encryptedFileName + '.' + extension;

      // upload the submission to the database
      const client = (Handler._database as MongoDatabase).client();
      await uploadSubmission(client, req.file);

      // clear the buffer after uploading
      req.file.buffer = null;

      // create a submission object
      const submission = {
        assignmentId: id,
        studentId: req.user,
        timestamp: new Date(),
        grade: -1,
        file: `/media/submissions/${req.file.originalname}`,
      };

      // save the submission to the database
      const result = await Handler._database.submissions.insert(submission);

      res.status(200).send({
        id: result,
        message: 'Submission Uploaded Successfully',
      });

    } catch (error) {
      Monitor.log(
        CreateAssignmentSubmissionsHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
