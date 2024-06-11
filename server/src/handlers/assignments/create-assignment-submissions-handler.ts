import mongoose from 'mongoose';

// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AUTHORIZATION_TYPE, REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { fileTypes, encryptName, uploadSubmission } from '../../helpers/grid';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { MongoClient } from 'mongodb';

/**
 * Create and store a new Assignment with specified data and adds it to the application's database.  Only an authenticated User with 'student' role who is enrolled in the Course corresponding to the Assignment's `courseId` can create a Submission.
 */
export class CreateAssignmentSubmissionsHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/:id/submissions',
      AUTHORIZATION_TYPE.NONE,
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

      // ADD CODE TO ACCEPT MULTIPART FORM DATA
      if (!req.file) {
        res.status(400).send({
          error: 'No file uploaded',
        });
        return;
      }

      const encryptedFileName = encryptName(req.file.originalname);
      const extension = fileTypes[req.file.mimetype];

      req.file.originalname = encryptedFileName + '.' + extension;

      // upload the submission to the database
      const client = Handler._database.mongoClient as MongoClient;
      await uploadSubmission(client, req.file);

      // clear the buffer after uploading
      req.file.buffer = null;

      res.status(200).send({
        message: 'Submission uploaded successfully',
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
